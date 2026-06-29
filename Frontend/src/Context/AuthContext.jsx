import React, { createContext, useState } from "react";
export const AuthDatacontext = createContext();

function AuthContext({ children }) {
  let serverUrl = "https://airbnb-backend-l3b7.onrender.com";
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
