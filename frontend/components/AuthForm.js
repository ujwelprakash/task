import { useState } from 'react';

const AuthForm = ({ onSubmit, type }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 w-full mb-2"/>
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="border p-2 w-full mb-2"/>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">{type === 'login' ? 'Login' : 'Register'}</button>
    </form>
  );
};

export default AuthForm;
