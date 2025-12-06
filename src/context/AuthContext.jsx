import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUser } from '../services/firestore';
import { initTelegramWebApp, getTelegramUser, isInsideTelegramApp, loginWithTelegram as telegramLogin, logout as telegramLogout } from '../services/telegramAuth';
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
        // Inizializza Firestore (solo una volta)
        await initializeSettings();
        await initializeGames();

        // Inizializza Telegram WebApp
        initTelegramWebApp();

        // Controlla localStorage per session persistente
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setIsAuth(true);
          setUser(userData);
          setLoading(false);
          return;
        }

        // Se siamo dentro Telegram WebApp, tenta auto-login
        if (isInsideTelegramApp()) {
          const telegramUser = getTelegramUser();
          if (telegramUser) {
            const result = await telegramLogin(telegramUser);
            if (result.success) {
              setIsAuth(true);
              setUser(result.user);
              localStorage.setItem('user', JSON.stringify(result.user));
            }
          }
        }
      } catch (error) {
        console.error('Initialization error:', error);
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
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await telegramLogout();
      setIsAuth(false);
      setUser(null);
      localStorage.removeItem('user');
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