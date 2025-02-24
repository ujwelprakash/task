import dbConnect from '../../utils/dbConnect';
import Task from '../../models/Task';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const tasks = await Task.find({ user: decoded.userId });
      return res.json(tasks);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid token' });
    }
  }

  if (req.method === 'POST') {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { title, description, dueDate, status } = req.body;

      const newTask = new Task({ title, description, dueDate, status, user: decoded.userId });
      await newTask.save();

      return res.status(201).json(newTask);
    } catch (error) {
      return res.status(400).json({ message: 'Error creating task' });
    }
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
