import React, { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useLocalStorage('user_info', {});
  const [loggedIn, setLoggedIn] = useLocalStorage('user_logged', false);
  const [environment, setEnvironment] = useLocalStorage('env', null);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        loggedIn,
        setLoggedIn,
        environment,
        setEnvironment,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
