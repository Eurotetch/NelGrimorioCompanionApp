import { createUser, getUser } from './firestore';

export const initTelegramWebApp = () => {
  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    tg.enableClosingConfirmation();
    console.log('✅ Telegram WebApp inizializzato');
    return tg;
  }
  return null;
};

export const getTelegramUser = () => {
  const tg = window.Telegram?.WebApp;
  
  if (!tg?.initDataUnsafe?.user) {
    console.warn('⚠️ Dati utente non disponibili');
    return null;
  }

  const user = tg.initDataUnsafe.user;
  return {
    id: user.id.toString(),
    firstName: user.first_name,
    lastName: user.last_name || '',
    username: user.username || '',
    photoUrl: user.photo_url || null
  };
};

export const isInsideTelegramApp = () => {
  return !!(window.Telegram?.WebApp?.initData);
};

export const loginWithTelegram = async (userData) => {
  try {
    if (!userData?.id) {
      throw new Error('Dati utente mancanti');
    }

    const userResult = await getUser(userData.id);
    
    if (!userResult.success) {
      await createUser(userData.id, {
        telegramId: userData.id,
        name: `${userData.firstName} ${userData.lastName}`.trim(),
        username: userData.username,
        avatar: userData.photoUrl,
        email: null
      });
    }

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
    console.error('❌ Login error:', error);
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  return { success: true };
};