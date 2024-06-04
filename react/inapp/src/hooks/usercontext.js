import React, { useState, useContext } from 'react';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (userData, usertoken) => {
    setUser(userData);
    setToken(usertoken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, token }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);





