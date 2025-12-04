import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// ==================== USERS ====================
export const createUser = async (userId, userData) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      ...userData,
      createdAt: serverTimestamp(),
      role: 'user', // default: user, admin, staff, referente
      preferences: {
        showCategories: {
          'Giochi da tavolo': true,
          'GDR': true,
          'Carte': true,
          'Party game': true,
          'Cooperativi': true
        }
      },
      stats: {
        gamesPlayed: 0,
        roomsCreated: 0,
        eventsJoined: 0
      }
    });
    return { success: true };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error };
  }
};

export const getUser = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    }
    return { success: false, error: 'User not found' };
  } catch (error) {
    console.error('Error getting user:', error);
    return { success: false, error };
  }
};

export const updateUser = async (userId, updates) => {
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, error };
  }
};

// ==================== GAMES ====================
export const getAllGames = async () => {
  try {
    const gamesRef = collection(db, 'games');
    const querySnapshot = await getDocs(gamesRef);
    const games = [];
    querySnapshot.forEach((doc) => {
      games.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: games };
  } catch (error) {
    console.error('Error getting games:', error);
    return { success: false, error };
  }
};

export const getGame = async (gameId) => {
  try {
    const docRef = doc(db, 'games', gameId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    }
    return { success: false, error: 'Game not found' };
  } catch (error) {
    console.error('Error getting game:', error);
    return { success: false, error };
  }
};

export const createGame = async (gameData) => {
  try {
    const gamesRef = collection(db, 'games');
    const newGameRef = doc(gamesRef);
    await setDoc(newGameRef, {
      ...gameData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: newGameRef.id };
  } catch (error) {
    console.error('Error creating game:', error);
    return { success: false, error };
  }
};

// ==================== ROOMS ====================
export const createRoom = async (roomData) => {
  try {
    const roomsRef = collection(db, 'rooms');
    const newRoomRef = doc(roomsRef);
    await setDoc(newRoomRef, {
      ...roomData,
      status: 'open',
      createdAt: serverTimestamp(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 giorni
    });
    return { success: true, id: newRoomRef.id };
  } catch (error) {
    console.error('Error creating room:', error);
    return { success: false, error };
  }
};

export const getRooms = async (filters = {}) => {
  try {
    let q = collection(db, 'rooms');
    
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    
    const querySnapshot = await getDocs(q);
    const rooms = [];
    querySnapshot.forEach((doc) => {
      rooms.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: rooms };
  } catch (error) {
    console.error('Error getting rooms:', error);
    return { success: false, error };
  }
};

// ==================== COLLECTIONS & WISHLISTS ====================
export const addToCollection = async (userId, gameId) => {
  try {
    const collectionRef = doc(db, 'personalCollections', userId);
    const collectionSnap = await getDoc(collectionRef);
    
    if (collectionSnap.exists()) {
      const games = collectionSnap.data().games || [];
      if (!games.includes(gameId)) {
        games.push(gameId);
        await updateDoc(collectionRef, { games });
      }
    } else {
      await setDoc(collectionRef, { games: [gameId] });
    }
    return { success: true };
  } catch (error) {
    console.error('Error adding to collection:', error);
    return { success: false, error };
  }
};

export const addToWishlist = async (userId, gameId) => {
  try {
    const wishlistRef = doc(db, 'wishlists', userId);
    const wishlistSnap = await getDoc(wishlistRef);
    
    if (wishlistSnap.exists()) {
      const games = wishlistSnap.data().games || [];
      if (!games.includes(gameId)) {
        games.push(gameId);
        await updateDoc(wishlistRef, { games });
      }
    } else {
      await setDoc(wishlistRef, { games: [gameId] });
    }
    return { success: true };
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return { success: false, error };
  }
};

export const getUserCollection = async (userId) => {
  try {
    const docRef = doc(db, 'personalCollections', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data().games || [] };
    }
    return { success: true, data: [] };
  } catch (error) {
    console.error('Error getting collection:', error);
    return { success: false, error };
  }
};

export const getUserWishlist = async (userId) => {
  try {
    const docRef = doc(db, 'wishlists', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data().games || [] };
    }
    return { success: true, data: [] };
  } catch (error) {
    console.error('Error getting wishlist:', error);
    return { success: false, error };
  }
};