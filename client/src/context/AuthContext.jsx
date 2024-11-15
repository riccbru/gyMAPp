import API from "@/lib/API";
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await API.info();
        setUser({
          uid: user.id,
          admin: user.admin,
          username: user.username,
        });
        setIsLogged(true);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const userData = await API.login(credentials); 
      setIsLogged(true);
      setUser(userData);
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await API.logout(); 
      setIsLogged(false);
      setUser(null);
    } catch (err) {
      console.log(`AuthContext:\n${err}`);
    }
  };

  const signup = async (userData) => {
    try {
      const res = await API.signup(userData);
    } catch (err) {
      console.log(`AuthContext.signup:\n${err}`);
    }
  }

  const value = {
    isLogged, setIsLogged,
    loading,
    user,
    login, logout, signup
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );

};

export { AuthContext, AuthProvider };