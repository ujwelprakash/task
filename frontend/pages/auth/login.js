import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ✅ Handle errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      await login(email, password);
      router.push("/dashboard"); // ✅ Redirect on success
    } catch (err) {
      setError(err.message || "Invalid Credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 px-4">
  <form 
    onSubmit={handleSubmit} 
    className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg"
  >
    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
    
    {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>} {/* ✅ Show error message */}
    
    <div className="mb-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />
    </div>

    <div className="mb-4">
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />
    </div>

    <button 
      type="submit" 
      className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold shadow-md hover:bg-blue-700 transition-all duration-300"
    >
      Login
    </button>

    <p className="text-gray-600 text-sm text-center mt-4">
      Don't have an account? 
      <a href="/auth/register" className="text-blue-500 hover:underline ml-1">Register</a>
    </p>
  </form>
</div>

  );
};

export default Login;
