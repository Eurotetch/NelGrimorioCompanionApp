import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../config/firebase';
import { createUser, getUser } from './firestore';

// Inizializza Telegram WebApp (solo se dentro Telegram)
export const initTelegramWebApp = () => {
  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    return tg;
  }
  return null;
};

// Ottieni dati utente Telegram WebApp
export const getTelegramUser = () => {
  const tg = window.Telegram?.WebApp;
  if (tg?.initDataUnsafe?.user) {
    return {
      id: tg.initDataUnsafe.user.id.toString(),
      firstName: tg.initDataUnsafe.user.first_name,
      lastName: tg.initDataUnsafe.user.last_name || '',
      username: tg.initDataUnsafe.user.username || '',
      photoUrl: tg.initDataUnsafe.user.photo_url || null
    };
  }
  return null;
};

// Controlla se siamo dentro Telegram WebApp
export const isInsideTelegramApp = () => {
  return !!window.Telegram?.WebApp?.initData;
};

// Login con Telegram (da WebApp o Widget)
export const loginWithTelegram = async (userData) => {
  try {
    if (!userData) {
      throw new Error('Telegram user data not available');
    }

    console.log('Telegram user:', userData);

    // Controlla se l'utente esiste già in Firestore
    const userResult = await getUser(userData.id);
    
    if (!userResult.success) {
      // Crea nuovo utente
      await createUser(userData.id, {
        telegramId: userData.id,
        name: `${userData.firstName} ${userData.lastName}`.trim(),
        username: userData.username,
        avatar: userData.photoUrl,
        email: null
      });
    }

    // TODO: Implementare Cloud Function per custom token
    // const customToken = await fetchCustomToken(userData.id);
    // await signInWithCustomToken(auth, customToken);

    return {
      success: true,
      user: {
        id: userData.id,
        name: `${userData.firstName} ${userData.lastName}`.trim(),
        username: userData.username,
        avatar: userData.photoUrl
      }
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

// Logout
export const logout = async () => {
  try {
    await auth.signOut();
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
};