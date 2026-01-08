import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "firebase/auth";

// Ensure this path is correct! It assumes firebase.js is in src/firebase.js
import { auth } from '../firebase'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes (Logged In / Out)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is Signed In
        setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName || currentUser.email.split('@')[0],
            avatar: currentUser.photoURL || "👤",
            role: currentUser.email === "admin@financio.com" ? "System Admin" : "Trader"
        });
      } else {
        // User is Signed Out
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const isAdmin = user?.role === "System Admin";

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAdmin, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
