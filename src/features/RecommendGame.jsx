// src/RecommendGame.jsx
import React, { useState } from 'react';

const CATEGORIES = [
  { id: 'strategy', name: 'Strategy', icon: '♟️' },
  { id: 'card', name: 'Card Game', icon: '🃏' },
  { id: 'cooperative', name: 'Cooperative', icon: '🤝' },
  { id: 'party', name: 'Party Game', icon: '🎉' },
  { id: 'family', name: 'Family', icon: '👨‍👩‍👧‍👦' },
  { id: 'abstract', name: 'Abstract', icon: '🌀' },
  { id: 'deck-building', name: 'Deck Building', icon: '📦' },
  { id: 'fantasy', name: 'Fantasy', icon: '🧙' },
  { id: 'sci-fi', name: 'Sci-Fi', icon: '🚀' },
  { id: 'horror', name: 'Horror', icon: '👻' },
];

// Mappa ID → termine di ricerca BGG
const SEARCH_TERMS = {
  'strategy': 'strategy',
  'card': 'card',
  'cooperative': 'cooperative',
  'party': 'party',
  'family': 'family',
  'abstract': 'abstract',
  'deck-building': 'deck building',
  'fantasy': 'fantasy',
  'sci-fi': 'sci-fi',
  'horror': 'horror',
};

const RecommendGame = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  const toggleTag = (tagId) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(t => t !== tagId)
        : [...prev, tagId]
    );
  };

  const removeTag = (tagId) => {
    setSelectedTags(prev => prev.filter(t => t !== tagId));
  };

  // Funzione per chiamare BGG con retry
  const fetchFromBGG = async (url) => {
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      try {
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
        const res = await fetch(proxyUrl);
        if (res.status === 202) {
          await new Promise(r => setTimeout(r, 2000));
          attempts++;
          continue;
        }
        const text = await res.text();
        return text;
      } catch (err) {
        attempts++;
        if (attempts >= maxAttempts) throw err;
        await new Promise(r => setTimeout(r, 2000));
      }
    }
    throw new Error('Max retries exceeded');
  };

  const parseSearchResults = (xmlText) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'text/xml');
    const items = doc.getElementsByTagName('item');
    const results = [];
    for (let i = 0; i < Math.min(items.length, 20); i++) {
      const id = items[i].getAttribute('id');
      if (id) results.push(id);
    }
    return results;
  };

  const parseGameDetails = (xmlText) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'text/xml');
    const item = doc.getElementsByTagName('item')[0];
    if (!item) return null;

    const getName = () => {
      const names = item.getElementsByTagName('name');
      for (let i = 0; i < names.length; i++) {
        if (names[i].getAttribute('primary') === 'true') {
          return names[i].textContent || 'Untitled';
        }
      }
      return names[0]?.textContent || 'Untitled';
    };

    const desc = item.getElementsByTagName('description')[0]?.textContent || '';
    const thumb = item.getElementsByTagName('thumbnail')[0]?.textContent || '';

    return {
      id: item.getAttribute('id'),
      name: getName(),
      thumbnail: thumb,
      description: desc.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').substring(0, 200) + '...',
      minplayers: parseInt(item.getElementsByTagName('minplayers')[0]?.textContent || '1', 10),
      maxplayers: parseInt(item.getElementsByTagName('maxplayers')[0]?.textContent || '4', 10),
      playingtime: parseInt(item.getElementsByTagName('playingtime')[0]?.textContent || '30', 10),
    };
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (selectedTags.length === 0) {
      setError('Seleziona almeno una categoria');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGames([]);

    try {
      // Combina i termini di ricerca
      const terms = selectedTags.map(id => SEARCH_TERMS[id]).join(' ');
      const searchUrl = `https://boardgamegeek.com/xmlapi2/search?query=${encodeURIComponent(terms)}&type=boardgame`;

      // 1. Cerca ID
      const searchXml = await fetchFromBGG(searchUrl);
      const gameIds = parseSearchResults(searchXml);
      if (gameIds.length === 0) throw new Error('Nessun gioco trovato');

      // 2. Recupera dettagli (massimo 10 per performance)
      const detailPromises = gameIds.slice(0, 10).map(id =>
        fetchFromBGG(`https://boardgamegeek.com/xmlapi2/thing?id=${id}&stats=1`)
          .then(xml => parseGameDetails(xml))
          .catch(() => null)
      );

      const allGames = (await Promise.all(detailPromises)).filter(g => g && g.thumbnail);

      // 3. Estrai 3 casuali
      const shuffled = [...allGames].sort(() => 0.5 - Math.random());
      setGames(shuffled.slice(0, 3));
    } catch (err) {
      console.error(err);
      setError('Impossibile recuperare i giochi. Riprova tra qualche secondo.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- Resto del componente (UI) identico al precedente ---
  const SkeletonCard = () => (
    <div style={{
      border: '1px solid #5A5245',
      borderRadius: '8px',
      padding: '12px',
      width: '180px',
      backgroundColor: '#000',
      color: '#fff',
      animation: 'pulse 1.5s infinite ease-in-out'
    }}>
      <div style={{ width: '100%', height: '120px', backgroundColor: '#222', borderRadius: '4px' }}></div>
      <div style={{ height: '16px', backgroundColor: '#222', marginTop: '8px' }}></div>
    </div>
  );

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#000',
      color: '#fff',
      fontFamily: 'sans-serif'
    }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🎲 Trova il tuo prossimo gioco da tavolo</h2>
      <p style={{ marginBottom: '20px', color: '#ccc' }}>Seleziona le categorie che ti interessano.</p>

      <form onSubmit={onSubmit}>
        {selectedTags.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <strong>Categorie selezionate:</strong>
            <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {selectedTags.map(tagId => {
                const cat = CATEGORIES.find(c => c.id === tagId);
                return (
                  <span
                    key={tagId}
                    style={{
                      backgroundColor: '#FCD34D',
                      color: '#000',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {cat?.name || tagId}
                    <button
                      type="button"
                      onClick={() => removeTag(tagId)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        color: '#000',
                        fontWeight: 'bold'
                      }}
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <strong>Scegli una o più categorie:</strong>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '12px',
            marginTop: '12px'
          }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleTag(cat.id)}
                style={{
                  width: '100px',
                  height: '100px',
                  border: selectedTags.includes(cat.id)
                    ? '2px solid #FCD34D'
                    : '1px solid #5A5245',
                  borderRadius: '8px',
                  backgroundColor: selectedTags.includes(cat.id) ? '#FCD34D' : '#000',
                  color: selectedTags.includes(cat.id) ? '#000' : '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  padding: '8px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{cat.icon}</div>
                <div>{cat.name}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || selectedTags.length === 0}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: isLoading ? '#5A5245' : '#FCD34D',
            color: isLoading ? '#aaa' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: (isLoading || selectedTags.length === 0) ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {isLoading ? 'Ricerca in corso...' : 'Trova 3 giochi'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>}

      {isLoading && (
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ marginBottom: '16px' }}>🕒 Ricerca in corso...</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        </div>
      )}

      {games.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ marginBottom: '16px' }}>🎉 Ecco i tuoi 3 giochi consigliati:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {games.map((game) => (
              <div
                key={game.id}
                style={{
                  border: '1px solid #5A5245',
                  borderRadius: '8px',
                  padding: '12px',
                  width: '180px',
                  backgroundColor: '#000',
                  color: '#fff'
                }}
              >
                {game.thumbnail ? (
                  <img
                    src={game.thumbnail}
                    alt={game.name}
                    style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '120px',
                    backgroundColor: '#111',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#5A5245'
                  }}>
                    Immagine non disponibile
                  </div>
                )}
                <h4 style={{ fontSize: '1rem', margin: '8px 0', lineHeight: 1.3 }}>{game.name}</h4>
                <p style={{ fontSize: '0.8rem', color: '#ddd' }}>
                  {game.minplayers}–{game.maxplayers} giocatori • {game.playingtime} min
                </p>
                <a
                  href={`https://boardgamegeek.com/boardgame/${game.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.8rem', color: '#FCD34D', display: 'block', marginTop: '6px' }}
                >
                  Scheda su BGG
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      <p style={{ fontSize: '0.8rem', color: '#777', marginTop: '24px' }}>
        ℹ️ Dati da <a href="https://boardgamegeek.com" target="_blank" style={{ color: '#FCD34D' }}>BoardGameGeek</a>
      </p>

      <style>{`
        @keyframes pulse {
          0% { background-color: #222; }
          50% { background-color: #333; }
          100% { background-color: #222; }
        }
      `}</style>
    </div>
  );
};

export default RecommendGame;