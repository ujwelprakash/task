import { createContext, useState, useContext, useEffect } from 'react';
import {AuthContext} from './AuthContext';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchTasks = async () => {
      try {
        const res = await fetch('/api/tasks', {
          headers: { Authorization: token },
        });

        if (!res.ok) throw new Error('Failed to fetch tasks');

        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchTasks();
  }, [token]);

  const addTask = async (task) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify(task),
      });

      if (!res.ok) throw new Error('Failed to add task');

      const newTask = await res.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const res = await fetch(`/api/tasks/${updatedTask._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify(updatedTask),
      });

      if (!res.ok) throw new Error('Failed to update task');

      setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { Authorization: token },
      });

      if (!res.ok) throw new Error('Failed to delete task');

      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
export const useTaskContext = () => useContext(TaskContext);

