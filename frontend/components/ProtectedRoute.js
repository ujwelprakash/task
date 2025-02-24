import { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  if (!user) {
    router.push('/login');
    return null;
  }

  return children;
};

export default ProtectedRoute;
