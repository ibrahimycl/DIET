import { Navigate } from 'react-router-dom';
import { useIsLogin } from '../stores/auth/hooks';

const ProtectedRoute = ({ children }) => {
  const isLogin = useIsLogin();

  if (isLogin) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
