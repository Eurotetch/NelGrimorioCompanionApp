import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getUser } from '../services/firestore';
import { initTelegramWebApp, loginWithTelegram as telegramLogin, logout as telegramLogout } from '../services/telegramAuth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inizializza Telegram WebApp
    initTelegramWebApp();

    // Listener Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Recupera dati utente da Firestore
        const result = await getUser(firebaseUser.uid);
        if (result.success) {
          setIsAuth(true);
          setUser(result.data);
        }
      } else {
        setIsAuth(false);
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithTelegram = async () => {
    try {
      const result = await telegramLogin();
      if (result.success) {
        setIsAuth(true);
        setUser(result.user);
        return { success: true };
      }
      return result;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await telegramLogout();
      setIsAuth(false);
      setUser(null);
      localStorage.removeItem('isAuth');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, loading, loginWithTelegram, logout }}>
      {loading ? (
        <div className="min-h-screen bg-stone-900 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};