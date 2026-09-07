import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AUTH_KEY = 'gina_portfolio_admin_auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(AUTH_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const login = (username, password) => {
    // Admin credentials check
    if (username === 'kyumakuma' && password === '2003Ginaaa18%') {
      const userData = { username, role: 'admin', loginTime: new Date().toISOString() };
      localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    }
    return { success: false, message: 'Invalid username or password' };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
