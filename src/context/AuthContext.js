import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();

  const token = localStorage.getItem('token');
  const userInfo = localStorage.getItem('userInfo');
  const expiresAt = localStorage.getItem('expiresAt');

  const [authState, setAuthState] = useState({
    token,
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {}
  });

  const setAuthInfo = ({ token, userInfo, expiresAt }) => {
    localStorage.setItem('token', token);
    localStorage.setItem(
      'userInfo',
      JSON.stringify(userInfo)
    );
    localStorage.setItem('expiresAt', expiresAt);

    setAuthState({
      token,
      userInfo,
      expiresAt
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('companyId');
    localStorage.removeItem('HRUserId');
    setAuthState({});
    history.push('/login');
  };

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) {
      return false;
    }
    //return (
     else if (( new Date().getTime() / 1000) > (authState.expiresAt)) {
        logout();
     } else {
       return true
     }
    //);
  };

  const isAdmin = () => {
    return authState.userInfo.role === 'admin';
  };

  const isCompanyUserHR = () => {
    return authState.userInfo.role === 'companyUserHR';
  };

  const isClientAccess = () => {
    return authState.userInfo.role === 'clientAccess';
  };
  const isAdminOrClientAccess = () => {
    return authState.userInfo.role === "admin" || "clientAccess";
  }
  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        logout,
        isAuthenticated,
        isAdmin,
        isClientAccess,
        isCompanyUserHR,
        isAdminOrClientAccess
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
