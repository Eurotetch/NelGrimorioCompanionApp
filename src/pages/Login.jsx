import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, User, Phone } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithTelegram } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const from = location.state?.from || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('Inserisci il tuo nome');
      return;
    }

    // Simula dati Telegram (temporaneo)
    const fakeUser = {
      id: phone || Date.now().toString(),
      firstName: name.split(' ')[0] || name,
      lastName: name.split(' ')[1] || '',
      username: name.toLowerCase().replace(/\s/g, '_'),
      photoUrl: null
    };

    const result = await loginWithTelegram(fakeUser);
    
    if (result.success) {
      navigate(from, { replace: true });
    }
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
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">Accedi</h1>
          <p className="text-stone-400 text-sm">
            Login temporaneo (in attesa integrazione Telegram)
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-stone-300 mb-2">
              Nome
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-stone-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Francesco Luongo"
                className="w-full pl-10 pr-4 py-3 bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-300 mb-2">
              Telefono (opzionale)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-stone-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+39 123 456 7890"
                className="w-full pl-10 pr-4 py-3 bg-stone-900 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 py-3 rounded-lg font-bold transition-colors"
          >
            Accedi
          </button>
        </form>

        <button 
          onClick={() => navigate(from, { replace: true })}
          className="w-full mt-3 bg-stone-700 hover:bg-stone-600 py-3 rounded-lg font-semibold transition-colors"
        >
          Continua come Ospite
        </button>

        <div className="mt-6 p-4 bg-cyan-900/30 border border-cyan-500 rounded-lg">
          <p className="text-xs text-cyan-300 text-center">
            ℹ️ Questa è una versione di sviluppo. L'integrazione Telegram completa arriverà presto.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;