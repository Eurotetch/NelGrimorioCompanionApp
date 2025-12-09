import { createUser, getUser } from './firestore';

export const initTelegramWebApp = () => {
  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    console.log('✅ Telegram WebApp ready');
    return tg;
  }
  return null;
};

export const getTelegramUser = () => {
  try {
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
    
    if (!user) {
      console.warn('⚠️ No Telegram user data');
      return null;
    }

    console.log('✅ Telegram user found:', user);
    
    return {
      id: user.id.toString(),
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      username: user.username || '',
      photoUrl: user.photo_url || null
    };
  } catch (error) {
    console.error('❌ Error getting Telegram user:', error);
    return null;
  }
};

export const isInsideTelegramApp = () => {
  return !!(window.Telegram?.WebApp?.initDataUnsafe?.user);
};

export const loginWithTelegram = async (userData) => {
  try {
    if (!userData?.id) {
      throw new Error('User data missing');
    }

    // NON chiamare Firestore se fallisce - usa solo localStorage
    let firestoreUser = null;
    try {
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
      firestoreUser = userResult.data;
    } catch (firestoreError) {
      console.warn('⚠️ Firestore error (continuing anyway):', firestoreError);
    }

    const user = {
      id: userData.id,
      name: `${userData.firstName} ${userData.lastName}`.trim(),
      username: userData.username,
      avatar: userData.photoUrl,
      role: firestoreUser?.role || 'user'
    };

    return { success: true, user };
  } catch (error) {
    console.error('❌ Login error:', error);
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  return { success: true };
};