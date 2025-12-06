import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const initializeSettings = async () => {
  try {
    const settingsRef = doc(db, 'settings', 'global');
    const settingsSnap = await getDoc(settingsRef);
    
    if (!settingsSnap.exists()) {
      await setDoc(settingsRef, {
        roomDuration: 30,
        openDays: ['tuesday', 'friday', 'sunday'],
        gameCategories: [
          'Giochi da Tavolo',
          'GDR',
          'Carte',
          'Party Game',
          'Cooperativi',
          'Strategici',
          'Famiglia'
        ]
      });
      console.log('✅ Settings initialized');
    }
  } catch (error) {
    console.error('❌ Error initializing settings:', error);
  }
};

export const initializeGames = async () => {
  try {
    const games = [
      {
        id: 'war-of-the-ring',
        title: "War of the Ring",
        img: "https://cf.geekdo-images.com/ImPgGag98W6gpV1KV812LA__imagepage/img/ZHAFxwwPAmpSqOjTHnpHBhV7TXY=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1215633.jpg",
        players: [2, 4],
        time: 180,
        rating: 8.5,
        category: "Strategico",
        complexity: "Alta",
        owner: "association",
        status: "available"
      },
      {
        id: 'catan',
        title: "Catan",
        img: "https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__imagepage/img/M_3Vv0uI7iNJSc_gYOtr5ql8AjY=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2419375.jpg",
        players: [3, 4],
        time: 90,
        rating: 7.2,
        category: "German",
        complexity: "Media",
        owner: "association",
        status: "available"
      },
      {
        id: 'dnd',
        title: "D&D",
        img: "https://cf.geekdo-images.com/6G3ZuW1c-TdmQWJMFjC5kg__imagepage/img/sJVY1jMUcCkDi1eV4JxLHRZ3pAg=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4254509.jpg",
        players: [3, 7],
        time: 240,
        rating: 8.8,
        category: "GDR",
        complexity: "Alta",
        owner: "association",
        status: "available"
      }
    ];

    for (const game of games) {
      const gameRef = doc(db, 'games', game.id);
      const gameSnap = await getDoc(gameRef);
      
      if (!gameSnap.exists()) {
        await setDoc(gameRef, game);
      }
    }
    
    console.log('✅ Games initialized');
  } catch (error) {
    console.error('❌ Error initializing games:', error);
  }
};