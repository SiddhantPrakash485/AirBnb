import React, { createContext } from "react";
export const AuthDatacontext = createContext();

function AuthContext({ children }) {
  let serverUrl = "http://localhost:8000";
  const value = {
    serverUrl,
  };
  return (
    <div>
      <AuthDatacontext.Provider value={value}>
        {children}
      </AuthDatacontext.Provider>
    </div>
  );
}

export default AuthContext;
