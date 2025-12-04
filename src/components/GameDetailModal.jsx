import React, { useState } from 'react';
import { X, Users, Clock, Star, Calendar, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const GameDetailModal = ({ game, onClose, isAuth = false }) => {
  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleWantToPlay = () => {
  if (!isAuth) {
    navigate('/login', { state: { from: location.pathname + location.search } });
    return;
  }
  setShowDateModal(true);
  };

  const handleCreateRoom = () => {
    if (selectedDates.length === 0) return;
    
    // TODO: Implementare creazione stanza con Firebase
    console.log('Creazione stanza:', { game: game.id, dates: selectedDates });
    alert(`Stanza creata per ${game.title} con ${selectedDates.length} date!`);
    setShowDateModal(false);
    setSelectedDates([]);
    onClose();
  };

  const toggleDate = (date) => {
    setSelectedDates(prev => 
      prev.includes(date) 
        ? prev.filter(d => d !== date)
        : prev.length < 3 
          ? [...prev, date] 
          : prev
    );
  };

  // Date disponibili (solo Mar/Ven/Dom)
  const availableDates = [
    'Mar 17 Dic',
    'Ven 20 Dic',
    'Dom 22 Dic',
    'Mar 24 Dic',
    'Ven 27 Dic',
    'Dom 29 Dic'
  ];

  return (
    <>
      {/* Game Detail Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
        <div className="bg-stone-800 rounded-2xl max-w-4xl w-full p-6 sm:p-8 border-2 border-yellow-500 max-h-screen overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 pr-4">
              {game.title}
            </h2>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-stone-700 rounded-lg flex-shrink-0 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Image */}
            <img 
              src={game.img} 
              alt={game.title} 
              className="w-full h-64 sm:h-80 object-cover rounded-xl" 
            />

            {/* Stats */}
            <div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                {/* Giocatori */}
                <div className="bg-stone-700 rounded-lg p-3 sm:p-4 text-center">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-cyan-400" />
                  <p className="text-xl sm:text-2xl font-bold">
                    {game.players[0]}-{game.players[1]}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-400">Giocatori</p>
                </div>

                {/* Durata */}
                <div className="bg-stone-700 rounded-lg p-3 sm:p-4 text-center">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-pink-400" />
                  <p className="text-xl sm:text-2xl font-bold">{game.time}</p>
                  <p className="text-xs sm:text-sm text-stone-400">Minuti</p>
                </div>

                {/* Rating */}
                <div className="bg-stone-700 rounded-lg p-3 sm:p-4 text-center col-span-2">
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 fill-yellow-400 text-yellow-400" />
                  <p className="text-xl sm:text-2xl font-bold">{game.rating}/10</p>
                  <p className="text-xs sm:text-sm text-stone-400">Rating BGG</p>
                </div>
              </div>

              {/* Categoria e Complessità */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400 text-sm">Categoria:</span>
                  <span className="px-3 py-1 bg-cyan-600 rounded-full text-sm font-semibold">
                    {game.category}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400 text-sm">Complessità:</span>
                  <span className="px-3 py-1 bg-stone-900 rounded-full text-sm font-semibold">
                    {game.complexity}
                  </span>
                </div>
                {game.owner !== 'association' && (
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400 text-sm">Proprietario:</span>
                    <span className="px-3 py-1 bg-purple-600 rounded-full text-sm font-semibold">
                      {game.owner}
                    </span>
                  </div>
                )}
              </div>

              {/* Descrizione */}
              <div className="bg-stone-900 rounded-lg p-4">
                <p className="text-sm sm:text-base text-stone-300">
                  {game.description || "Epico gioco strategico che ti farà immergere in un'avventura indimenticabile. Perfetto per serate tra amici!"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={handleWantToPlay}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 py-3 sm:py-4 rounded-lg font-bold text-stone-900 text-sm sm:text-base transition-colors"
          >
            🎲 Voglio Giocarci!
          </button>
        </div>
      </div>

      {/* Date Selection Modal */}
      {showDateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-[60] flex items-center justify-center p-4">
          <div className="bg-stone-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 border-2 border-yellow-500 max-h-screen overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400">
                Scegli le date
              </h2>
              <button 
                onClick={() => {
                  setShowDateModal(false);
                  setSelectedDates([]);
                }} 
                className="p-2 hover:bg-stone-700 rounded-lg flex-shrink-0 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Info Box */}
            <div className="mb-6 p-4 bg-cyan-900 bg-opacity-30 border border-cyan-500 rounded-lg">
              <p className="text-xs sm:text-sm text-cyan-300 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                Seleziona fino a 3 date disponibili (solo Mar/Ven/Dom). Sarai il creatore della stanza!
              </p>
            </div>

            {/* Date Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-6">
              {availableDates.map(date => (
                <button
                  key={date}
                  onClick={() => toggleDate(date)}
                  className={`p-3 rounded-lg text-center text-sm font-semibold transition-all ${
                    selectedDates.includes(date)
                      ? 'bg-yellow-500 text-stone-900 scale-105'
                      : 'bg-stone-700 hover:bg-stone-600 text-white'
                  }`}
                >
                  <Calendar className="w-4 h-4 mx-auto mb-1" />
                  {date}
                </button>
              ))}
            </div>

            {/* Selected Dates Info */}
            <div className="mb-6 text-center">
              <p className="text-stone-400 text-sm">
                {selectedDates.length === 0 && 'Nessuna data selezionata'}
                {selectedDates.length === 1 && '1 data selezionata'}
                {selectedDates.length > 1 && `${selectedDates.length} date selezionate`}
              </p>
              {selectedDates.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {selectedDates.map(date => (
                    <span key={date} className="px-3 py-1 bg-yellow-500 text-stone-900 rounded-full text-xs font-bold">
                      {date}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Create Button */}
            <button 
              onClick={handleCreateRoom}
              disabled={selectedDates.length === 0}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 py-3 sm:py-4 rounded-lg font-bold text-stone-900 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base transition-colors"
            >
              Crea Stanza ({selectedDates.length} {selectedDates.length === 1 ? 'data' : 'date'})
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GameDetailModal;