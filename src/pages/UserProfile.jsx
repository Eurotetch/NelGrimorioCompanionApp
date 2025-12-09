import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Calendar, Trophy, Gamepad2, Star, LogOut, Settings, Heart, ShoppingBag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('collezione');

  // TODO: Recuperare da Firebase Auth
  const user = {
    name: 'Francesco Luongo',
    username: '@eurotetch',
    email: 'francesco@example.com',
    avatar: null,
    joinedDate: 'Novembre 2024',
    role: 'Admin',
    stats: {
      gamesPlayed: 47,
      roomsCreated: 12,
      eventsJoined: 8
    }
  };

  // TODO: Recuperare da Firebase
  const myCollection = [
    { 
      id: 1, 
      title: "War of the Ring", 
      img: "https://cf.geekdo-images.com/ImPgGag98W6gpV1KV812aA__itemrep@2x/img/aW_RKvV1YF2-YDPPoB6XS1gnNFw=/fit-in/492x600/filters:strip_icc()/pic1215633.jpg",
      status: 'available'
    },
    { 
      id: 5, 
      title: "Pandemic", 
      img: "https://cf.geekdo-images.com/S3ybV1LAp-8Um9sx63Kc3w__imagepage/img/kIBu-2Ljb_ml5n-S8uIbE6ehGFc=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1534148.jpg",
      status: 'loaned',
      loanedTo: 'Marco'
    }
  ];

  const wishlist = [
    { 
      id: 10, 
      title: "Wingspan", 
      img: "https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__imagepage/img/uIjeoKgHMcRtzRSR4MoUYl3nXxs=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4458123.jpg"
    },
    { 
      id: 11, 
      title: "Gloomhaven", 
      img: "https://cf.geekdo-images.com/sZYp_3BTDGjh2unaZfZmuA__imagepage/img/pBaOL7vV402nn1I5dHsdSKsFHqA=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2437871.jpg"
    }
  ];

  const handleLogout = () => {
    // TODO: Implementare logout Firebase
    console.log('Logout');
    navigate('/');
  };

  const tabs = [
    { id: 'collezione', label: 'La Mia Collezione', icon: Gamepad2 },
    { id: 'wishlist', label: 'Wishlist', icon: Star },
    { id: 'storico', label: 'Storico Partite', icon: Trophy },
    { id: 'impostazioni', label: 'Impostazioni', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-stone-900 text-white">
      <Navbar showSearch={false} />

      <div className="max-w-5xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Torna indietro</span>
        </button>

        {/* Profile Header */}
        <div className="bg-stone-800 rounded-2xl p-6 sm:p-8 border-2 border-yellow-500 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-4xl sm:text-5xl flex-shrink-0">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-16 h-16 text-stone-900" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400">{user.name}</h1>
                {user.role === 'Admin' && (
                  <span className="px-3 py-1 bg-red-600 rounded-full text-xs font-bold">ADMIN</span>
                )}
              </div>
              <p className="text-stone-400 mb-1">{user.username}</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-stone-400 mb-4">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-stone-400">
                <Calendar className="w-4 h-4" />
                <span>Membro da {user.joinedDate}</span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-stone-700">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-yellow-400">{user.stats.gamesPlayed}</p>
              <p className="text-xs sm:text-sm text-stone-400">Partite Giocate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-cyan-400">{user.stats.roomsCreated}</p>
              <p className="text-xs sm:text-sm text-stone-400">Stanze Create</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-pink-400">{user.stats.eventsJoined}</p>
              <p className="text-xs sm:text-sm text-stone-400">Eventi Partecipati</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-yellow-500 text-stone-900'
                  : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {/* Collezione */}
          {activeTab === 'collezione' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-yellow-400">
                  La Mia Collezione ({myCollection.length})
                </h2>
                <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-stone-900 font-semibold rounded-lg text-sm transition-colors">
                  + Aggiungi Gioco
                </button>
              </div>

              {myCollection.length === 0 ? (
                <div className="bg-stone-800 rounded-xl p-12 text-center">
                  <Gamepad2 className="w-16 h-16 mx-auto mb-4 text-stone-600" />
                  <p className="text-stone-400 mb-4">Non hai ancora aggiunto giochi alla tua collezione</p>
                  <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-stone-900 font-bold rounded-lg transition-colors">
                    Aggiungi il tuo primo gioco
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {myCollection.map(game => (
                    <div key={game.id} className="bg-stone-800 rounded-xl overflow-hidden border-2 border-stone-700 hover:border-yellow-500 cursor-pointer transition-all group">
                      <div className="relative">
                        <img src={game.img} alt={game.title} className="w-full h-32 sm:h-40 object-cover" />
                        {game.status === 'loaned' && (
                          <div className="absolute top-2 right-2 px-2 py-1 bg-orange-500 rounded-full text-xs font-bold">
                            Prestato a {game.loanedTo}
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="font-bold text-sm line-clamp-2 group-hover:text-yellow-400 transition-colors">
                          {game.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Wishlist */}
          {activeTab === 'wishlist' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-yellow-400">
                  Wishlist ({wishlist.length})
                </h2>
              </div>

              {wishlist.length === 0 ? (
                <div className="bg-stone-800 rounded-xl p-12 text-center">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-stone-600" />
                  <p className="text-stone-400 mb-4">Non hai ancora giochi nella wishlist</p>
                  <button 
                    onClick={() => navigate('/games')}
                    className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-stone-900 font-bold rounded-lg transition-colors"
                  >
                    Esplora i giochi
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {wishlist.map(game => (
                    <div key={game.id} className="bg-stone-800 rounded-xl overflow-hidden border-2 border-stone-700 hover:border-yellow-500 cursor-pointer transition-all group">
                      <img src={game.img} alt={game.title} className="w-full h-32 sm:h-40 object-cover" />
                      <div className="p-3">
                        <h3 className="font-bold text-sm line-clamp-2 group-hover:text-yellow-400 transition-colors">
                          {game.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Storico Partite */}
          {activeTab === 'storico' && (
            <div className="bg-stone-800 rounded-xl p-8 sm:p-12 text-center">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">Storico Partite</h3>
              <p className="text-stone-400 mb-6">Funzionalità in arrivo! Qui vedrai tutte le tue partite giocate.</p>
            </div>
          )}

          {/* Impostazioni */}
          {activeTab === 'impostazioni' && (
            <div className="space-y-6">
              <div className="bg-stone-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-yellow-400 mb-4">Preferenze Categorie</h3>
                <p className="text-stone-400 text-sm mb-4">
                  Seleziona le categorie di giochi che vuoi vedere nella home
                </p>
                <div className="space-y-3">
                  {['Giochi da Tavolo', 'GDR', 'Carte', 'Party Game', 'Cooperativi'].map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        defaultChecked 
                        className="w-5 h-5 rounded border-stone-600 text-yellow-500 focus:ring-yellow-500"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-stone-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-yellow-400 mb-4">Notifiche</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Nuove stanze disponibili</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-stone-600 text-yellow-500 focus:ring-yellow-500" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Promemoria eventi</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-stone-600 text-yellow-500 focus:ring-yellow-500" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Messaggi nella chat stanza</span>
                    <input type="checkbox" className="w-5 h-5 rounded border-stone-600 text-yellow-500 focus:ring-yellow-500" />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;