import React, { useState } from 'react';
import { Search, X, Users, Clock, Star, Bell, User, LogIn, Menu, MessageCircle, Calendar, Send, Facebook, Instagram, Gamepad2, Home, AlertCircle, ShoppingCart, Mail } from 'lucide-react';

const NelGrimorioApp = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showGameDetail, setShowGameDetail] = useState(null);
  const [showRoomDetail, setShowRoomDetail] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const games = [
    { id: 1, title: "War of the Ring", img: "https://cf.geekdo-images.com/ImPgGag98W6gpV1KV812LA__imagepage/img/ZHAFxwwPAmpSqOjTHnpHBhV7TXY=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1215633.jpg", players: [2,4], time: 180, rating: 8.5 },
    { id: 2, title: "Catan", img: "https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__imagepage/img/M_3Vv0uI7iNJSc_gYOtr5ql8AjY=/fit-in/900x600/filters:no_upscale():strip_icc()/pic2419375.jpg", players: [3,4], time: 90, rating: 7.2 },
    { id: 3, title: "D&D", img: "https://cf.geekdo-images.com/6G3ZuW1c-TdmQWJMFjC5kg__imagepage/img/sJVY1jMUcCkDi1eV4JxLHRZ3pAg=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4254509.jpg", players: [3,7], time: 240, rating: 8.8 }
  ];

  const rooms = [
    { 
      id: 'r1', 
      game: games[0], 
      creator: 'Marco', 
      active: ['Marco', 'Luca', 'Sara', 'Anna'],
      bench: [],
      max: 4, 
      days: -5 
    },
    { 
      id: 'r2', 
      game: games[1], 
      creator: 'Giovanni',
      active: ['Giovanni', 'Francesca'],
      bench: [],
      max: 4, 
      days: -25 
    },
    { 
      id: 'r3', 
      game: games[2], 
      creator: 'Paolo',
      active: ['Paolo', 'Elena', 'Tommaso', 'Lisa', 'Andrea', 'Sofia', 'Marco'],
      bench: ['Giulia', 'Roberto'],
      max: 7, 
      days: 'Passata' 
    }
  ];

  const menu = [
    { icon: Home, label: 'Home' },
    { icon: Gamepad2, label: 'Lista Giochi' },
    { icon: MessageCircle, label: 'Consigliami tu!' },
    { icon: ShoppingCart, label: 'Mercatino Compravendite' },
    { icon: Calendar, label: 'Programma Eventi' },
    { icon: Send, label: 'Invia Feedback' }
  ];

  return (
    <div className="min-h-screen bg-stone-900 text-white overflow-x-hidden" style={{ fontFamily: 'var(--font-main, system-ui, -apple-system, sans-serif)' }}>
      <style>{`
        :root {
          --color-primary: #DCB339;
          --color-bg: #0F0F0F;
          --font-main: system-ui, -apple-system, sans-serif;
        }
      `}</style>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-stone-950 border-r border-stone-800 z-50 transition-transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-yellow-400">Menu</h2>
            <button onClick={() => setShowSidebar(false)} className="p-2 hover:bg-stone-800 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          {menu.map((item, i) => (
            <button key={i} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-stone-800 text-left mb-2">
              <item.icon className="w-5 h-5 text-yellow-400" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {showSidebar && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowSidebar(false)} />}

      {/* Navbar */}
      <nav className="bg-stone-950 border-b border-yellow-600 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button onClick={() => setShowSidebar(true)} className="p-2 hover:bg-stone-800 rounded-lg flex-shrink-0">
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              </button>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center text-lg sm:text-2xl flex-shrink-0">📖</div>
              <div className="hidden sm:block">
                <h1 className="text-xl sm:text-2xl font-bold text-yellow-400">Nel Grimorio</h1>
                <p className="text-xs text-stone-400">Associazione Ludica</p>
              </div>
            </div>

            <div className="flex-1 max-w-xs sm:max-w-md mx-2">
              <div className="relative">
                <Search className="absolute left-2 sm:left-3 top-2 sm:top-2.5 w-4 h-4 sm:w-5 sm:h-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Cerca..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 sm:pl-10 pr-2 sm:pr-4 py-1.5 sm:py-2 text-sm bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-stone-800 rounded-lg relative flex-shrink-0">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full" />
              </button>
              {isAuth ? (
                <button className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg font-semibold text-stone-900 text-sm">
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline">Francesco</span>
                </button>
              ) : (
                <button onClick={() => setShowAuth(true)} className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg font-semibold text-xs sm:text-sm">
                  <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Accedi</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Stanze */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-4 sm:mb-6">🎲 Stanze Attive</h2>
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4">
            {rooms.map(room => (
              <div key={room.id} onClick={() => setShowRoomDetail(room)} className="flex-shrink-0 w-56 sm:w-64 bg-stone-800 rounded-xl overflow-hidden border-2 border-stone-700 hover:border-yellow-500 cursor-pointer">
                <div className="relative h-28 sm:h-32">
                  <img src={room.game.img} alt={room.game.title} className="w-full h-full object-cover" />
                  <div className={`absolute top-2 right-2 ${room.days === 'Passata' ? 'bg-red-500' : room.days > -7 ? 'bg-orange-500' : 'bg-yellow-500'} px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1`}>
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    {room.days === 'Passata' ? 'Passata' : `${room.days}g`}
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-base sm:text-lg font-bold text-yellow-400 mb-1 truncate">{room.game.title}</h3>
                  <p className="text-xs text-stone-400 mb-2">di {room.creator}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <span className="font-semibold">{room.active.length}/{room.max}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Eventi */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-4 sm:mb-6">📅 Prossimi Eventi</h2>
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl p-6 sm:p-8 text-center">
            <p className="text-xl sm:text-2xl font-bold mb-2">Torneo Catan</p>
            <p className="text-sm sm:text-base">Venerdì 20 Dicembre ore 20:00</p>
          </div>
        </section>

        {/* Giochi */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-4 sm:mb-6">🔥 Hotness & New</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {games.map(game => (
              <div key={game.id} onClick={() => !isAuth ? setShowAuth(true) : setShowDateModal(true)} className="bg-stone-800 rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                <img src={game.img} alt={game.title} className="w-full h-32 sm:h-48 object-cover" />
                <div className="p-2 sm:p-3">
                  <h3 className="font-bold text-xs sm:text-sm mb-1 truncate">{game.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-stone-400">
                    <Users className="w-3 h-3" />
                    {game.players[0]}-{game.players[1]}
                    <Clock className="w-3 h-3 ml-2" />
                    {game.time}min
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-stone-950 border-t border-stone-800 mt-12 sm:mt-16 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-stone-400 text-xs sm:text-sm">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4">
            <a href="mailto:nelgrimorioterni@gmail.com" className="hover:text-yellow-400 flex items-center gap-2">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              nelgrimorioterni@gmail.com
            </a>
            <a href="#" className="hover:text-yellow-400 flex items-center gap-2">
              <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              Facebook
            </a>
            <a href="#" className="hover:text-yellow-400 flex items-center gap-2">
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              Instagram
            </a>
          </div>
          <p>Made with ❤️ by Francesco Luongo using React & Firebase</p>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="bg-stone-800 rounded-2xl max-w-md w-full p-6 sm:p-8 border-2 border-yellow-500 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400">Accedi</h2>
              <button onClick={() => setShowAuth(false)} className="p-2 hover:bg-stone-700 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-stone-300 mb-6 text-sm sm:text-base">Accedi con Telegram per gestire stanze e organizzare partite</p>
            <button onClick={() => { setIsAuth(true); setShowAuth(false); }} className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base mb-3">
              <LogIn className="inline w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Accedi con Telegram
            </button>
            <button onClick={() => setShowAuth(false)} className="w-full bg-stone-700 hover:bg-stone-600 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base">
              Continua come anonimo
            </button>
            <p className="text-xs text-stone-500 mt-4 text-center">Come ospite Anonimo non potrai creare né partecipare alle stanze né usare funzionalità extra</p>
          </div>
        </div>
      )}

      {/* Room Detail Modal */}
      {showRoomDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="bg-stone-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 border-2 border-yellow-500 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400">{showRoomDetail.game.title}</h2>
              <button onClick={() => setShowRoomDetail(null)} className="p-2 hover:bg-stone-700 rounded-lg flex-shrink-0">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <img src={showRoomDetail.game.img} className="w-full h-48 sm:h-64 object-cover rounded-xl mb-6" />
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-3">👥 Giocatori Attivi ({showRoomDetail.active.length}/{showRoomDetail.max})</h3>
              <div className="flex flex-wrap gap-2">
                {showRoomDetail.active.map((player, i) => (
                  <span key={i} className="bg-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {player}
                  </span>
                ))}
              </div>
            </div>

            {showRoomDetail.bench.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-orange-400 mb-3">⏸️ In Panchina ({showRoomDetail.bench.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {showRoomDetail.bench.map((player, i) => (
                    <span key={i} className="bg-stone-700 text-stone-400 px-3 py-1 rounded-full text-sm">
                      {player}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button onClick={() => { setShowRoomDetail(null); setShowGameDetail(showRoomDetail.game); }} className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 py-3 sm:py-4 rounded-lg font-bold text-stone-900 text-sm sm:text-base">
              Vedi Dettagli Gioco
            </button>
          </div>
        </div>
      )}

      {/* Date Modal */}
      {showDateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="bg-stone-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 border-2 border-yellow-500 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400">Scegli le date</h2>
              <button onClick={() => setShowDateModal(false)} className="p-2 hover:bg-stone-700 rounded-lg flex-shrink-0">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="mb-6 p-4 bg-cyan-900 bg-opacity-30 border border-cyan-500 rounded-lg">
              <p className="text-xs sm:text-sm text-cyan-300 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                Seleziona fino a 3 date (solo Mar/Ven/Dom). Sarai il creatore!
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-6">
              {['Mar 17 Dic', 'Ven 20 Dic', 'Dom 22 Dic', 'Mar 24 Dic', 'Ven 27 Dic'].map(date => (
                <button key={date} onClick={() => setSelectedDates(prev => prev.includes(date) ? prev.filter(d => d !== date) : prev.length < 3 ? [...prev, date] : prev)} className={`p-2 sm:p-3 rounded-lg text-center text-xs sm:text-sm ${selectedDates.includes(date) ? 'bg-yellow-500 text-stone-900 font-bold' : 'bg-stone-700 hover:bg-stone-600'}`}>
                  {date}
                </button>
              ))}
            </div>
            <button onClick={() => { setShowDateModal(false); setSelectedDates([]); }} disabled={selectedDates.length === 0} className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 py-3 sm:py-4 rounded-lg font-bold text-stone-900 disabled:opacity-50 text-sm sm:text-base">
              Crea Stanza ({selectedDates.length} date)
            </button>
          </div>
        </div>
      )}

      {/* Game Detail */}
      {showGameDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="bg-stone-800 rounded-2xl max-w-4xl w-full p-6 sm:p-8 border-2 border-yellow-500 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 pr-4">{showGameDetail.title}</h2>
              <button onClick={() => setShowGameDetail(null)} className="p-2 hover:bg-stone-700 rounded-lg flex-shrink-0">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <img src={showGameDetail.img} alt={showGameDetail.title} className="w-full h-64 sm:h-80 object-cover rounded-xl" />
              <div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                  <div className="bg-stone-700 rounded-lg p-3 sm:p-4 text-center">
                    <Users className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-cyan-400" />
                    <p className="text-xl sm:text-2xl font-bold">{showGameDetail.players[0]}-{showGameDetail.players[1]}</p>
                    <p className="text-xs sm:text-sm text-stone-400">Giocatori</p>
                  </div>
                  <div className="bg-stone-700 rounded-lg p-3 sm:p-4 text-center">
                    <Clock className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-pink-400" />
                    <p className="text-xl sm:text-2xl font-bold">{showGameDetail.time}</p>
                    <p className="text-xs sm:text-sm text-stone-400">Minuti</p>
                  </div>
                  <div className="bg-stone-700 rounded-lg p-3 sm:p-4 text-center col-span-2">
                    <Star className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 fill-yellow-400 text-yellow-400" />
                    <p className="text-xl sm:text-2xl font-bold">{showGameDetail.rating}/10</p>
                    <p className="text-xs sm:text-sm text-stone-400">Rating BGG</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-stone-300">Epico gioco strategico ambientato nella Terra di Mezzo.</p>
              </div>
            </div>
            <button onClick={() => { setShowGameDetail(null); !isAuth ? setShowAuth(true) : setShowDateModal(true); }} className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 py-3 sm:py-4 rounded-lg font-bold text-stone-900 text-sm sm:text-base">
              🎲 Voglio Giocarci!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NelGrimorioApp;