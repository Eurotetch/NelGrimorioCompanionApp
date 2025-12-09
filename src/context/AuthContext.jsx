import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUser } from '../services/firestore';
import { loginWithTelegram as telegramLogin } from '../services/telegramAuth';
import { initializeSettings, initializeGames } from '../utils/initializeFirestore';

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
    const initializeApp = async () => {
      try {
        await initializeSettings();
        await initializeGames();

        // Controlla localStorage
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setIsAuth(true);
          setUser(userData);
        }
      } catch (error) {
        console.error('Errore inizializzazione:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  const loginWithTelegram = async (userData) => {
    try {
      const result = await telegramLogin(userData);
      if (result.success) {
        setIsAuth(true);
        setUser(result.user);
        localStorage.setItem('user', JSON.stringify(result.user));
        return { success: true };
      }
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    setIsAuth(false);
    setUser(null);
    localStorage.removeItem('user');
    return { success: true };
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