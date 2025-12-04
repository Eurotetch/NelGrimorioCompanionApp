import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '../config/firebase';
import { createUser, getUser } from './firestore';

// Inizializza Telegram WebApp
export const initTelegramWebApp = () => {
  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    return tg;
  }
  return null;
};

// Ottieni dati utente Telegram
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

// Login con Telegram
export const loginWithTelegram = async () => {
  try {
    const telegramUser = getTelegramUser();
    
    if (!telegramUser) {
      throw new Error('Telegram user data not available');
    }

    // TODO: Implementare Cloud Function Firebase per generare custom token
    // Per ora, simuliamo il login
    console.log('Telegram user:', telegramUser);

    // Controlla se l'utente esiste già in Firestore
    const userResult = await getUser(telegramUser.id);
    
    if (!userResult.success) {
      // Crea nuovo utente
      await createUser(telegramUser.id, {
        telegramId: telegramUser.id,
        name: `${telegramUser.firstName} ${telegramUser.lastName}`.trim(),
        username: telegramUser.username,
        avatar: telegramUser.photoUrl,
        email: null // Telegram non fornisce email
      });
    }

    // TODO: Implementare signInWithCustomToken quando sarà pronta la Cloud Function
    // const customToken = await fetchCustomToken(telegramUser.id);
    // await signInWithCustomToken(auth, customToken);

    return {
      success: true,
      user: {
        id: telegramUser.id,
        name: `${telegramUser.firstName} ${telegramUser.lastName}`.trim(),
        username: telegramUser.username,
        avatar: telegramUser.photoUrl
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