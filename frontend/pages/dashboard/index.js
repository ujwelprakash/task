import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import TaskList from "../../components/TaskList";
import TaskForm from "../../components/Taskform"; // ✅ Fixed import (capitalization issue)
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import PDFDownload from "../../components/PDFDownload";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Auth Token:", token); // ✅ Debugging token
    if (!token) {
      router.push("/auth/login");
      return;
    }

    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch tasks");
        }

        const data = await res.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  const handleAddTask = async (formData) => {
    if (!token) return;

    try {
      setError("");
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ No Content-Type needed for FormData
        },
        body: formData, // ✅ Uses FormData to support file uploads
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add task");
      }

      const createdTask = await res.json();
      setTasks((prevTasks) => [...prevTasks, createdTask]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!token) return;

    try {
      setError("");
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete task");
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditTask = async (updatedTask) => {
    if (!token) return;

    try {
      setError("");
      const res = await fetch(`http://localhost:5000/api/tasks/${updatedTask._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update task");
      }

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {loading && <p className="text-blue-500">Loading tasks...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <TaskForm onSubmit={handleAddTask} />
        <TaskList tasks={tasks} onDelete={handleDeleteTask} onEdit={handleEditTask} />
        <PDFDownload tasks={tasks} />
      </div>
    </div>
  );
};

export default Dashboard;
