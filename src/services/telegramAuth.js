import { createUser, getUser } from './firestore';

export const initTelegramWebApp = () => {
  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    console.log('✅ Telegram WebApp inizializzato');
    return tg;
  }
  console.log('⚠️ Telegram WebApp non disponibile');
  return null;
};

export const getTelegramUser = () => {
  const tg = window.Telegram?.WebApp;
  
  if (!tg?.initDataUnsafe?.user) {
    console.log('⚠️ Dati utente Telegram non disponibili');
    console.log('InitData:', tg?.initData);
    console.log('InitDataUnsafe:', tg?.initDataUnsafe);
    return null;
  }

  const user = tg.initDataUnsafe.user;
  console.log('✅ Dati utente Telegram trovati:', user);

  return {
    id: user.id.toString(),
    firstName: user.first_name,
    lastName: user.last_name || '',
    username: user.username || '',
    photoUrl: user.photo_url || null
  };
};

export const isInsideTelegramApp = () => {
  const inside = !!window.Telegram?.WebApp?.initData;
  console.log('🔍 Dentro Telegram?', inside);
  return inside;
};

export const loginWithTelegram = async (userData) => {
  try {
    if (!userData || !userData.id) {
      throw new Error('Dati utente Telegram mancanti');
    }

    console.log('🔐 Tentativo login con:', userData);

    const userResult = await getUser(userData.id);
    
    if (!userResult.success) {
      console.log('📝 Creazione nuovo utente...');
      await createUser(userData.id, {
        telegramId: userData.id,
        name: `${userData.firstName} ${userData.lastName}`.trim(),
        username: userData.username || '',
        avatar: userData.photoUrl,
        email: null
      });
    }

    console.log('✅ Login completato');
    return {
      success: true,
      user: {
        id: userData.id,
        name: `${userData.firstName} ${userData.lastName}`.trim(),
        username: userData.username || '',
        avatar: userData.photoUrl
      }
    };
  } catch (error) {
    console.error('❌ Errore login:', error);
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  try {
    console.log('👋 Logout effettuato');
    return { success: true };
  } catch (error) {
    console.error('❌ Errore logout:', error);
    return { success: false, error: error.message };
  }
};