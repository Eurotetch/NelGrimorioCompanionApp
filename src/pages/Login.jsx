import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, AlertCircle, Info } from 'lucide-react';
import TelegramLoginButton from '../components/TelegramLoginButton';
import { isInsideTelegramApp, getTelegramUser } from '../services/telegramAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithTelegram } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const from = location.state?.from || '/';
  const insideTelegram = isInsideTelegramApp();

  // Se siamo dentro Telegram WebApp, usa i dati direttamente
  const handleTelegramWebAppLogin = async () => {
    setIsLoading(true);
    setError(null);

    const telegramUser = getTelegramUser();
    if (!telegramUser) {
      setError('Impossibile ottenere i dati utente da Telegram');
      setIsLoading(false);
      return;
    }

    const result = await loginWithTelegram(telegramUser);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Errore durante il login');
    }
    
    setIsLoading(false);
  };

  // Callback per il widget Telegram (da browser)
  const handleTelegramWidgetAuth = async (user) => {
    setIsLoading(true);
    setError(null);

    const result = await loginWithTelegram(user);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Errore durante il login');
    }
    
    setIsLoading(false);
  };

  const handleGuestContinue = () => {
    navigate(from, { replace: true });
  };

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
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
            📖
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">Benvenuto!</h1>
          <p className="text-stone-300 text-sm">
            Accedi per creare stanze, organizzare partite e gestire la tua collezione
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* Info: diverso metodo in base a dove apri l'app */}
        {!insideTelegram && (
          <div className="mb-4 p-3 bg-cyan-900/30 border border-cyan-500 rounded-lg flex items-start gap-2">
            <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-cyan-300">
              Stai aprendo l'app da browser. Clicca sul pulsante Telegram qui sotto per autenticarti.
            </p>
          </div>
        )}

        {/* Telegram WebApp (dentro Telegram) */}
        {insideTelegram ? (
          <button 
            onClick={handleTelegramWebAppLogin}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 py-4 rounded-lg font-bold text-base mb-3 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Connessione in corso...</span>
              </>
            ) : (
              <span>Accedi con Telegram</span>
            )}
          </button>
        ) : (
          /* Telegram Widget (da browser) */
          <div className="mb-3">
            <TelegramLoginButton 
              botUsername="NelGrimorioCompanionApp_bot" 
              onAuth={handleTelegramWidgetAuth}
              buttonSize="large"
            />
          </div>
        )}

        <button 
          onClick={handleGuestContinue}
          disabled={isLoading}
          className="w-full bg-stone-700 hover:bg-stone-600 py-3 rounded-lg font-semibold text-base transition-colors disabled:opacity-50"
        >
          Continua come Ospite
        </button>

        <div className="mt-6 p-4 bg-stone-900 border border-stone-700 rounded-lg">
          <p className="text-xs text-stone-400 text-center">
            ⚠️ <strong>Modalità Ospite:</strong> Non potrai creare stanze, partecipare alle partite o accedere al profilo utente
          </p>
        </div>

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