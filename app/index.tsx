import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, StatusBar, FlatList, Modal, Pressable, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './header';
import { styles } from './styles';

interface Task {
  text: string;
  completed: boolean;
  isEditing: boolean;
}

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingText, setEditingText] = useState<string>('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  useEffect(() => {
    
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };

    loadTasks();
  }, []);

  const saveTasks = async (tasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Erro ao salvar tarefas:', error);
    }
  };

  const addTask = () => {
    if (inputValue.trim()) {
      const newTasks = [...tasks, { text: inputValue.trim(), completed: false, isEditing: false }];
      setTasks(newTasks);
      saveTasks(newTasks);
      setInputValue('');
    }
  };

  const completeTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const openDeleteModal = (index: number) => {
    setTaskToDelete(index);
    setShowModal(true);
  };

  const handleDeleteTask = () => {
    if (taskToDelete !== null) {
      const newTasks = [...tasks];
      newTasks.splice(taskToDelete, 1);
      setTasks(newTasks);
      saveTasks(newTasks);
      setTaskToDelete(null);
    }
    setShowModal(false);
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
    setShowModal(false);
  };

  const startEditingTask = (index: number) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  const saveTask = () => {
    if (editingIndex !== null) {
      const newTasks = [...tasks];
      newTasks[editingIndex].text = editingText;
      newTasks[editingIndex].isEditing = false;
      setTasks(newTasks);
      saveTasks(newTasks);
      setEditingIndex(null);
      setEditingText('');
    }
  };

  const handleDoubleClick = (index: number) => {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 300) {
      startEditingTask(index);
    }
    setLastClickTime(currentTime);
  };

  const handleKeyPressEdit = (e: any) => {
    if (e.nativeEvent.key === 'Enter') {
      saveTask();
    }
  };

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const pendingTasksCount = tasks.length - completedTasksCount;

  return (
    <>
      <StatusBar
        style="light-content"
        backgroundColor="#262626"
        translucent={true}
      />
      <Header />
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder='Adicione uma nova tarefa'
            placeholderTextColor='#808080'
            value={inputValue}
            onChangeText={setInputValue}
            onKeyPress={(e) => e.nativeEvent.key === 'Enter' && addTask()}
          />
          <TouchableOpacity style={styles.button} onPress={addTask}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.counters}>
          <View style={styles.counterContainer}>
            <Text style={[styles.counterText, { color: '#4EA8DE' }]}>Pendentes</Text>
            <View style={styles.counterBox}>
              <Text style={styles.counterBoxText}>{pendingTasksCount}</Text>
            </View>
          </View>
          <View style={styles.counterContainer}>
            <Text style={[styles.counterText, { color: '#8284FA' }]}>Concluídas</Text>
            <View style={styles.counterBox}>
              <Text style={styles.counterBoxText}>{completedTasksCount}</Text>
            </View>
          </View>
        </View>

        <FlatList
          data={tasks}
          renderItem={({ item, index }) => (
            <View style={styles.taskContainer}>
              <TouchableOpacity onPress={() => completeTask(index)}>
                <Icon
                  name={item.completed ? 'check-circle' : 'radio-button-unchecked'}
                  size={24}
                  color={item.completed ? '#8284FA' : '#4EA8DE'}
                />
              </TouchableOpacity>

              {editingIndex === index ? (
                <TextInput
                  style={styles.input}
                  value={editingText}
                  onChangeText={setEditingText}
                  onKeyPress={handleKeyPressEdit}
                  autoFocus={true}
                />
              ) : (
                <TouchableOpacity onPress={() => handleDoubleClick(index)}>
                  <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
                    {item.text}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={() => openDeleteModal(index)} style={styles.trashIcon}>
                <Icon name='delete' size={24} color='#808080' />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        {/* Modal de Exclusão */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Tem certeza de que deseja excluir esta tarefa?</Text>
              <View style={styles.modalButtons}>
                <Pressable style={[styles.modalButton, styles.modalButtonCancel]} onPress={cancelDelete}>
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </Pressable>
                <Pressable style={[styles.modalButton, styles.modalButtonDelete]} onPress={handleDeleteTask}>
                  <Text style={styles.modalButtonText}>Excluir</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
