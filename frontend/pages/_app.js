import { AuthProvider } from '../context/AuthContext';
import { TaskProvider } from '../context/TaskContext';
import '../styles/globals.css';
import '../styles/tailwind.css';


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <TaskProvider>
        <Component {...pageProps} />
      </TaskProvider>
    </AuthProvider>
  );
}

export default MyApp;