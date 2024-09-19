import { StyleSheet } from 'react-native';
import { RollInLeft, RollInRight } from 'react-native-reanimated';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
    justifyContent: 'flex-start',
  },
  input: {
    flex: 1,
    height: 56,
    backgroundColor: '#262626',
    borderRadius: 6,
    color: '#FFFFFF',
    padding: 15,
    marginRight: 5,
    fontSize: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 6,
    backgroundColor: '#1E6F9F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    flexDirection: 'row',
    marginTop: -28,
    paddingRight: 24,
    paddingLeft: 24,
  },
  counters: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 20,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  createdCounter: {
    color: '#4EA8DE',
  },
  completedCounter: {
    color: '#8284FA',
  },
  counterBox: {
    backgroundColor: '#262626',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  counterBoxText: {
    color: '#D9D9D9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#333333',
    marginVertical: 5,
    alignSelf: 'center',
    borderRadius: 6,
  },
  taskText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 10,
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#808080',
  },
  trashIcon: {
    marginLeft: 'auto',
  },
});
