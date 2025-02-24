import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (user) {
      router.push("/");
    }
  }, [user, loading]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
        Welcome to Task Manager
      </h1>
      <p className="text-lg md:text-xl max-w-lg mb-6 opacity-90">
        Manage your tasks efficiently and export them as PDFs.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => router.push("/auth/login")}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition-all transform hover:scale-105"
        >
          Login
        </button>

        <button
          onClick={() => router.push("/auth/register")}
          className="bg-green-500 px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-all transform hover:scale-105"
        >
          Register
        </button>
      </div>
    </div>
  );
}
