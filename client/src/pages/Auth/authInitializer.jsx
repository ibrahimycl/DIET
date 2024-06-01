import { useEffect } from 'react';
import { setLogin } from '../../stores/auth/actions';
import useInitialAuth from '../../hooks/useInitialAuth';

const AuthInitializer = () => {

  useEffect(() => {
    const initializeAuth = async () => {
      await useInitialAuth()
      .then(res => {
        setLogin(res)
      })
    };

    initializeAuth();
  }, []);

  return null; 
};

export default AuthInitializer;
