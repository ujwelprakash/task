import { useState } from 'react';
import { useRouter } from 'next/router';

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/auth/register', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json(); // Read response JSON

    if (res.ok) {
      alert('Registration successful!');
      router.push("/auth/login");
    } else {
      alert(`Registration failed: ${data.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-teal-500 px-4">
  <form 
    onSubmit={handleSubmit} 
    className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg"
  >
    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Register</h2>
    
    <div className="mb-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
        required
      />
    </div>

    <div className="mb-4">
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
        required
      />
    </div>

    <button 
      type="submit" 
      className="w-full bg-green-600 text-white py-3 rounded-md font-semibold shadow-md hover:bg-green-700 transition-all duration-300"
    >
      Register
    </button>

    <p className="text-gray-600 text-sm text-center mt-4">
      Already have an account? 
      <a href="/auth/login" className="text-green-700 hover:underline ml-1">Login</a>
    </p>
  </form>
</div>

  );
};

export default Register;
