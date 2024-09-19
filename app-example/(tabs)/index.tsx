import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from './header';
import { styles } from './styles';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>([]);

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { text: inputValue.trim(), completed: false }]);
      setInputValue('');
    }
  };

  const completeTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const createdTasksCount = tasks.length;
  const completedTasksCount = tasks.filter(task => task.completed).length;

  return (
    <>
      <StatusBar
        barStyle={"default"}
        backgroundColor={"transparent"}
        translucent
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
          />
          <TouchableOpacity style={styles.button} onPress={addTask}>
            <Text style={styles.buttonText}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.counters}>
          <View style={styles.counterContainer}>
            <Text style={[styles.counterText, styles.createdCounter]}>Pendentes</Text>
            <View style={styles.counterBox}>
              <Text style={styles.counterBoxText}>{createdTasksCount}</Text>
            </View>
          </View>
          <View style={styles.counterContainer}>
            <Text style={[styles.counterText, styles.completedCounter]}>Concluídas</Text>
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
              <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
                {item.text}
              </Text>
              <TouchableOpacity onPress={() => deleteTask(index)} style={styles.trashIcon}>
                <Icon
                  name='delete'
                  size={24}
                  color='#808080'
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
}
