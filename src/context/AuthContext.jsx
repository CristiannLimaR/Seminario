import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    if (email === 'admin' && password === 'admin1234') {
      const userData = { name: 'Administrador', email };
      setUser(userData);
      return { success: true, user: userData };
    } else {
      return { success: false, error: 'Credenciales incorrectas' };
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 