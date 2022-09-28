import { createContext, useState } from 'react';

const defaultValue = {
  token: '',
  login: () => {},
};

const AuthContext = createContext(defaultValue);

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const loginHanddler = () => {
    setToken(token);
  };

  const contextValue = {
    token: token,
    login: loginHanddler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
