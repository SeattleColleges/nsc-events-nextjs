"use client";
{/* Custom React hook to manage and track user authentication state.*/}
import { useState, useEffect } from 'react';

interface User {
  role: string; 
}

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    setIsAuth(!!token);
    if (token) {
      // Decode token, update user state
      const user = JSON.parse(atob(token.split('.')[1]));
      setUser(user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth(); // Initial check

    const handleAuthChange = () => {
      checkAuth();
    };
    // Listen for 'auth-change' events to dynamically update auth state across the app.
    window.addEventListener('auth-change', handleAuthChange);

    // Cleanup by removing the event listener on component unmount.
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  return { isAuth, user };
};


export default useAuth;