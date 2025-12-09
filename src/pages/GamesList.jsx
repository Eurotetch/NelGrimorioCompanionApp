import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, X, Users, Clock, Star, Filter, ArrowLeft, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GameDetailModal from '../components/GameDetailModal';

const GamesList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlayers, setSelectedPlayers] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedComplexity, setSelectedComplexity] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showGameDetail, setShowGameDetail] = useState(null);

  // 🎲 DATI MOCK - Sostituiremo con Firebase
  const games = [
    { 
      id: 1, 
      title: "War of the Ring", 
      img: "https://cf.geekdo-images.com/ImPgGag98W6gpV1KV812aA__itemrep@2x/img/aW_RKvV1YF2-YDPPoB6XS1gnNFw=/fit-in/492x600/filters:strip_icc()/pic1215633.jpg", 
      players: [2,4], 
      time: 180, 
      rating: 8.5,
      category: "Strategico",
      complexity: "Alta",
      owner: "association"
    },
    { 
      id: 2, 
      title: "Catan", 
      img: "https://cf.geekdo-images.com/0XODRpReiZBFUffEcqT5-Q__itemrep@2x/img/81lS9PRn2JwyE4br1l7Z5fgSyFo=/fit-in/492x600/filters:strip_icc()/pic9156909.png", 
      players: [3,4], 
      time: 90, 
      rating: 7.2,
      category: "German",
      complexity: "Media",
      owner: "association"
    },
    { 
      id: 3, 
      title: "D&D", 
      img: "https://static.cnews.fr/sites/default/files/2020_redaction/brok_5f3e9a4f4526b.jpg", 
      players: [3,7], 
      time: 240, 
      rating: 8.8,
      category: "GDR",
      complexity: "Alta",
      owner: "association"
    },
    { 
      id: 4, 
      title: "Ticket to Ride", 
      img: "https://cf.geekdo-images.com/kdWYkW-7AqG63HhqPL6ekA__itemrep@2x/img/nAI08lHzxwXX2mVrNcBms4FEO_o=/fit-in/492x600/filters:strip_icc()/pic8937637.jpg", 
      players: [2,5], 
      time: 60, 
      rating: 7.4,
      category: "Famiglia",
      complexity: "Bassa",
      owner: "association"
    },
    { 
      id: 5, 
      title: "Pandemic", 
      img: "https://cf.geekdo-images.com/S3ybV1LAp-8Um9sx63Kc3w__imagepage/img/kIBu-2Ljb_ml5n-S8uIbE6ehGFc=/fit-in/900x600/filters:no_upscale():strip_icc()/pic1534148.jpg", 
      players: [2,4], 
      time: 45, 
      rating: 7.6,
      category: "Cooperativo",
      complexity: "Media",
      owner: "Marco"
    },
    { 
      id: 6, 
      title: "7 Wonders", 
      img: "https://cf.geekdo-images.com/35h9Za_JvMMMtx_92kT0Jg__itemrep@2x/img/C1Q2lgN2URAqsAtanK5XI72phN8=/fit-in/492x600/filters:strip_icc()/pic7149798.jpg", 
      players: [2,7], 
      time: 30, 
      rating: 7.7,
      category: "Carte",
      complexity: "Media",
      owner: "association"
    },
  ];

  const categories = ['Tutti', 'Strategico', 'GDR', 'German', 'Famiglia', 'Cooperativo', 'Carte', 'Party game'];

  // 🔍 Filtri applicati
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchCategory = selectedCategory === 'all' || game.category === selectedCategory;
      
      const matchPlayers = selectedPlayers === 'all' || 
                          (parseInt(selectedPlayers) >= game.players[0] && 
                           parseInt(selectedPlayers) <= game.players[1]);
      
      const matchDuration = selectedDuration === 'all' ||
                           (selectedDuration === 'short' && game.time <= 60) ||
                           (selectedDuration === 'medium' && game.time > 60 && game.time <= 120) ||
                           (selectedDuration === 'long' && game.time > 120);
      
      const matchComplexity = selectedComplexity === 'all' || game.complexity === selectedComplexity;

      return matchSearch && matchCategory && matchPlayers && matchDuration && matchComplexity;
    });
  }, [searchTerm, selectedCategory, selectedPlayers, selectedDuration, selectedComplexity, games]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedPlayers('all');
    setSelectedDuration('all');
    setSelectedComplexity('all');
  };

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedPlayers !== 'all',
    selectedDuration !== 'all',
    selectedComplexity !== 'all'
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-stone-900 text-white">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Torna indietro</span>
          </button>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">
            🎲 Lista Giochi
          </h1>
          <p className="text-stone-400">
            {filteredGames.length} giochi trovati
            {searchTerm && ` per "${searchTerm}"`}
          </p>
        </div>

        {/* Barra Ricerca e Filtri */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Cerca per nome o categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-stone-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Toggle Filtri */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="font-semibold">Filtri</span>
              {activeFiltersCount > 0 && (
                <span className="bg-yellow-500 text-stone-900 text-xs font-bold px-2 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
              >
                Reset
              </button>
            )}
          </div>

          {/* Pannello Filtri */}
          {showFilters && (
            <div className="bg-stone-800 border border-stone-700 rounded-lg p-4 space-y-4">
              {/* Categoria */}
              <div>
                <label className="block text-sm font-semibold text-stone-300 mb-2">Categoria</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                >
                  <option value="all">Tutte le categorie</option>
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Numero Giocatori */}
              <div>
                <label className="block text-sm font-semibold text-stone-300 mb-2">Numero Giocatori</label>
                <select
                  value={selectedPlayers}
                  onChange={(e) => setSelectedPlayers(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                >
                  <option value="all">Qualsiasi numero</option>
                  <option value="2">2 giocatori</option>
                  <option value="3">3 giocatori</option>
                  <option value="4">4 giocatori</option>
                  <option value="5">5+ giocatori</option>
                </select>
              </div>

              {/* Durata */}
              <div>
                <label className="block text-sm font-semibold text-stone-300 mb-2">Durata</label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                >
                  <option value="all">Qualsiasi durata</option>
                  <option value="short">Breve (60+ min)</option>
                  <option value="medium">Media (60-120 min)</option>
                  <option value="long">Lunga (120+ min)</option>
                </select>
              </div>

              {/* Complessità */}
              <div>
                <label className="block text-sm font-semibold text-stone-300 mb-2">Complessità</label>
                <select
                  value={selectedComplexity}
                  onChange={(e) => setSelectedComplexity(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                >
                  <option value="all">Qualsiasi</option>
                  <option value="Bassa">Bassa</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Griglia Giochi */}
        {filteredGames.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-stone-400 text-lg mb-4">Nessun gioco trovato</p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-stone-900 font-bold rounded-lg transition-colors"
            >
              Rimuovi filtri
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGames.map(game => (
              <div
                key={game.id}
                onClick={() => setShowGameDetail(game)}
                className="bg-stone-800 rounded-xl overflow-hidden border-2 border-stone-700 hover:border-yellow-500 cursor-pointer transition-all hover:scale-105"
              >
                <img
                  src={game.img}
                  alt={game.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-white flex-1 line-clamp-2">{game.title}</h3>
                    {game.owner !== 'association' && (
                      <span className="ml-2 px-2 py-0.5 bg-cyan-600 text-xs rounded-full whitespace-nowrap">
                        Di {game.owner}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2 text-sm text-stone-400">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{game.players[0]}-{game.players[1]} giocatori</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{game.time} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{game.rating}/10 BGG</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="px-2 py-1 bg-stone-700 text-xs rounded-full">
                      {game.category}
                    </span>
                    <span className="px-2 py-1 bg-stone-700 text-xs rounded-full">
                      {game.complexity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />

      {/* Game Detail Modal */}
      {showGameDetail && (
        <GameDetailModal
          game={showGameDetail}
          onClose={() => setShowGameDetail(null)}
        />
      )}
    </div>
  );
};

export default GamesList;