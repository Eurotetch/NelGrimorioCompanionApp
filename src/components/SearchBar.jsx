import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ games, onGameSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const filtered = games.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.category?.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, games]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/games?search=${encodeURIComponent(searchTerm)}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (game) => {
    setSearchTerm('');
    setShowSuggestions(false);
    onGameSelect?.(game);
  };

  return (
    <div className="relative flex-1 max-w-xs sm:max-w-md mx-2">
      <div className="relative">
        <Search className="absolute left-2 sm:left-3 top-2 sm:top-2.5 w-4 h-4 sm:w-5 sm:h-5 text-stone-400" />
        <input
          type="text"
          placeholder="Cerca giochi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="w-full pl-8 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2 text-sm bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
        />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              setShowSuggestions(false);
            }}
            className="absolute right-2 sm:right-3 top-2 sm:top-2.5 text-stone-400 hover:text-white"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>

      {/* Suggerimenti Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-stone-800 border border-stone-700 rounded-lg shadow-xl z-50 overflow-hidden">
          {suggestions.map((game) => (
            <div
              key={game.id}
              onClick={() => handleSuggestionClick(game)}
              className="px-4 py-3 hover:bg-stone-700 cursor-pointer border-b border-stone-700 last:border-b-0 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={game.img}
                  alt={game.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm">{game.title}</h4>
                  <p className="text-xs text-stone-400">
                    {game.players[0]}-{game.players[1]} giocatori • {game.time} min
                  </p>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={handleSearch}
            className="w-full px-4 py-3 bg-stone-900 hover:bg-stone-700 text-yellow-400 font-semibold text-sm transition-colors"
          >
            Vedi tutti i risultati →
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;