import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, AlertCircle, ExternalLink, Loader } from 'lucide-react';
import { isInsideTelegramApp, getTelegramUser } from '../services/telegramAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithTelegram, isAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const from = location.state?.from || '/';
  const insideTelegram = isInsideTelegramApp();

  // Se già autenticato, redirect immediato
  useEffect(() => {
    if (isAuth) {
      navigate(from, { replace: true });
    }
  }, [isAuth, navigate, from]);

  // Auto-login se dentro Telegram
  useEffect(() => {
    if (insideTelegram && !isAuth) {
      handleTelegramWebAppLogin();
    }
  }, [insideTelegram, isAuth]);

  const handleTelegramWebAppLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const telegramUser = getTelegramUser();
      
      if (!telegramUser) {
        throw new Error('Impossibile ottenere i dati da Telegram');
      }

      console.log('✅ Dati Telegram ricevuti:', telegramUser);

      const result = await loginWithTelegram(telegramUser);
      
      if (result.success) {
        console.log('✅ Login completato con successo');
        navigate(from, { replace: true });
      } else {
        throw new Error(result.error || 'Login fallito');
      }
    } catch (err) {
      console.error('❌ Errore login:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestContinue = () => {
    navigate(from, { replace: true });
  };

  const handleOpenTelegramBot = () => {
    window.open('https://t.me/NelGrimorioCompanionApp_bot', '_blank');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-900 text-white flex items-center justify-center p-4">
        <div className="text-center">
          <Loader className="w-16 h-16 text-yellow-400 animate-spin mx-auto mb-4" />
          <p className="text-xl font-semibold text-yellow-400">Accesso in corso...</p>
          <p className="text-stone-400 text-sm mt-2">Autenticazione con Telegram</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-900 text-white flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-stone-900 to-cyan-900/10" />
      
      <button
        onClick={() => navigate(from)}
        className="absolute top-4 left-4 flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors z-10"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Indietro</span>
      </button>

      <div className="relative bg-stone-800 rounded-2xl max-w-md w-full p-6 sm:p-8 border-2 border-yellow-500 shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
            📖
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">Benvenuto!</h1>
          <p className="text-stone-300 text-sm">
            Accedi per creare stanze, organizzare partite e gestire la tua collezione
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-300 mb-2">{error}</p>
              <button
                onClick={handleTelegramWebAppLogin}
                className="text-xs text-red-200 underline hover:text-red-100"
              >
                Riprova
              </button>
            </div>
          </div>
        )}

        {/* Se dentro Telegram */}
        {insideTelegram ? (
          <div className="mb-4 p-4 bg-cyan-900/30 border border-cyan-500 rounded-lg text-center">
            <p className="text-sm text-cyan-300 mb-3">
              ✅ Sei già dentro Telegram! Il login avverrà automaticamente.
            </p>
            <button
              onClick={handleTelegramWebAppLogin}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 py-3 rounded-lg font-bold text-base transition-colors"
            >
              Accedi con Telegram
            </button>
          </div>
        ) : (
          /* Se da browser normale */
          <div className="mb-4">
            <div className="p-4 bg-yellow-900/30 border border-yellow-500 rounded-lg mb-4">
              <p className="text-sm text-yellow-300 mb-3 text-center">
                ⚠️ Per accedere, devi aprire l'app dal <strong>bot Telegram</strong>
              </p>
            </div>
            
            <button
              onClick={handleOpenTelegramBot}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 py-4 rounded-lg font-bold text-base transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Apri Bot Telegram
            </button>
            
            <p className="text-xs text-stone-500 text-center mt-3">
              Clicca sul pulsante "Apri App" nel bot per autenticarti
            </p>
          </div>
        )}

        {/* Guest Button */}
        <button 
          onClick={handleGuestContinue}
          className="w-full bg-stone-700 hover:bg-stone-600 py-3 rounded-lg font-semibold text-base transition-colors"
        >
          Continua come Ospite
        </button>

        {/* Warning Ospite */}
        <div className="mt-6 p-4 bg-stone-900 border border-stone-700 rounded-lg">
          <p className="text-xs text-stone-400 text-center">
            ⚠️ <strong>Modalità Ospite:</strong> Non potrai creare stanze, partecipare alle partite o accedere al profilo utente
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-6 space-y-2">
          <p className="text-xs font-semibold text-yellow-400 mb-2">Con l'account puoi:</p>
          <div className="space-y-1 text-xs text-stone-300">
            <p>✓ Creare e gestire stanze di gioco</p>
            <p>✓ Organizzare partite con date personalizzate</p>
            <p>✓ Gestire la tua collezione e wishlist</p>
            <p>✓ Chattare con altri giocatori nelle stanze</p>
            <p>✓ Ricevere notifiche sugli eventi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;