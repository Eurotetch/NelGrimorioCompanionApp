import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import TelegramLoginButton from '../components/TelegramLoginButton';
import { isInsideTelegramApp } from '../services/telegramAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithTelegram, isAuth } = useAuth();
  const [error, setError] = useState(null);

  const from = location.state?.from || '/';
  const insideTelegram = isInsideTelegramApp();

  // Se già autenticato, redirect
  useEffect(() => {
    if (isAuth) {
      navigate(from, { replace: true });
    }
  }, [isAuth, navigate, from]);

  const handleTelegramAuth = async (userData) => {
    setError(null);
    const result = await loginWithTelegram(userData);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Errore durante il login');
    }
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
            {insideTelegram 
              ? 'Sei dentro Telegram! Il login è automatico.' 
              : 'Accedi con Telegram per iniziare'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* Widget Telegram (solo da browser) */}
        {!insideTelegram && (
          <div className="mb-4">
            <TelegramLoginButton 
              botUsername="NelGrimorioCompanionApp_bot"
              onAuth={handleTelegramAuth}
            />
          </div>
        )}

        {/* Se dentro Telegram, spiega che è automatico */}
        {insideTelegram && (
          <div className="mb-4 p-4 bg-cyan-900/30 border border-cyan-500 rounded-lg text-center">
            <p className="text-sm text-cyan-300">
              ✅ Login automatico attivo. Se non sei stato autenticato, riapri l'app.
            </p>
          </div>
        )}

        <button 
          onClick={handleGuestContinue}
          className="w-full bg-stone-700 hover:bg-stone-600 py-3 rounded-lg font-semibold text-base transition-colors"
        >
          Continua come Ospite
        </button>

        <div className="mt-6 p-4 bg-stone-900 border border-stone-700 rounded-lg">
          <p className="text-xs text-stone-400 text-center">
            ⚠️ <strong>Modalità Ospite:</strong> Non potrai creare stanze o gestire la collezione
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;