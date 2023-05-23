
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);

  const login = (email, password) => {
    const users = [
      { email: 'user1@example.com', password: 'password1', firstName: 'John', lastName: 'Doe' },
      { email: 'user2@example.com', password: 'password2', firstName: 'Jane', lastName: 'Smith' },
      { email: 'user3@example.com', password: 'password3', firstName: 'Bob', lastName: 'Johnson' },
    ];

    const foundUser = users.find((user) => user.email === email && user.password === password);

    if (foundUser) {
      setUser(foundUser);
    } else {
      setUser(null);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
