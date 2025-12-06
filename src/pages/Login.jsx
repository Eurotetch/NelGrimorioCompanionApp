import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, AlertCircle, Info, Loader } from 'lucide-react';
import TelegramLoginButton from '../components/TelegramLoginButton';
import { isInsideTelegramApp, getTelegramUser } from '../services/telegramAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithTelegram, isAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const from = location.state?.from || '/';
  const insideTelegram = isInsideTelegramApp();

  // Se già autenticato, redirect
  useEffect(() => {
    if (isAuth) {
      navigate(from, { replace: true });
    }
  }, [isAuth, navigate, from]);

  // Se dentro Telegram, tenta auto-login immediato
  useEffect(() => {
    if (insideTelegram) {
      handleTelegramWebAppLogin();
    }
  }, [insideTelegram]);

  // Login da Telegram WebApp (dentro l'app Telegram)
  const handleTelegramWebAppLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const telegramUser = getTelegramUser();
      
      if (!telegramUser) {
        setError('Impossibile ottenere i dati da Telegram. Riprova.');
        setIsLoading(false);
        return;
      }

      console.log('Dati Telegram WebApp:', telegramUser);

      const result = await loginWithTelegram(telegramUser);
      
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Errore durante il login');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Errore imprevisto durante il login');
    } finally {
      setIsLoading(false);
    }
  };

  // Callback per il widget Telegram (da browser desktop)
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

  // Se dentro Telegram e sta caricando, mostra loader
  if (insideTelegram && isLoading) {
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

        {/* Info: solo da browser */}
        {!insideTelegram && (
          <div className="mb-4 p-3 bg-cyan-900/30 border border-cyan-500 rounded-lg flex items-start gap-2">
            <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-cyan-300">
              Clicca sul pulsante Telegram qui sotto per autenticarti tramite il tuo account Telegram.
            </p>
          </div>
        )}

        {/* Telegram Widget (solo da browser) */}
        {!insideTelegram && (
          <div className="mb-3">
            <TelegramLoginButton 
              botUsername="NelGrimorioCompanionApp_bot"
              onAuth={handleTelegramWidgetAuth}
              buttonSize="large"
            />
          </div>
        )}

        {/* Guest Button */}
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