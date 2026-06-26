import React, { createContext, useState } from "react";
export const AuthDatacontext = createContext();

function AuthContext({ children }) {
  let serverUrl = "http://localhost:8000";
  let [loading, setLoading] = useState(false);
  const value = {
    serverUrl,
    loading,
    setLoading,
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
