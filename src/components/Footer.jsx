import React from 'react';
import { Mail, Facebook, Instagram, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-950 border-t border-stone-800 mt-12 sm:mt-16 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Logo e Descrizione */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center text-xl">
              📖
            </div>
            <h3 className="text-xl font-bold text-yellow-400">Nel Grimorio</h3>
          </div>
          <p className="text-stone-400 text-sm max-w-md mx-auto">
            Associazione Ludica di Terni - Il punto di riferimento per gli appassionati di giochi da tavolo e di ruolo
          </p>
        </div>

        {/* Contatti e Social */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6">
          <a 
            href="mailto:nelgrimorioterni@gmail.com" 
            className="flex items-center gap-2 text-stone-400 hover:text-yellow-400 transition-colors text-xs sm:text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">nelgrimorioterni@gmail.com</span>
            <span className="sm:hidden">Email</span>
          </a>
          
          <a 
            href="https://www.facebook.com/nelgrimorioterni" 
            className="flex items-center gap-2 text-stone-400 hover:text-yellow-400 transition-colors text-xs sm:text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Facebook</span>
          </a>
          
          <a 
            href="https://www.instagram.com/nelgrimorioterni" 
            className="flex items-center gap-2 text-stone-400 hover:text-yellow-400 transition-colors text-xs sm:text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Instagram</span>
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-800 mb-4"></div>

        {/* Credits */}
        <div className="text-center text-stone-400 text-xs sm:text-sm">
          <p className="flex items-center justify-center gap-1 flex-wrap">
            <span>Made with</span>
            <Heart className="w-4 h-4 fill-red-500 text-red-500 inline" />
            <span>by</span>
            <a 
              href="https://github.com/Eurotetch" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
            >
              Francesco Luongo
            </a>
            <span className="hidden sm:inline">using React & Firebase</span>
          </p>
          <p className="mt-2 text-stone-500 text-xs">
            © {new Date().getFullYear()} Nel Grimorio - Tutti i diritti riservati
          </p>
        </div>

        {/* Links Utili (opzionale) */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-stone-500">
          <a href="/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="/terms" className="hover:text-yellow-400 transition-colors">Termini di Servizio</a>
          <span>•</span>
          <a href="/about" className="hover:text-yellow-400 transition-colors">Chi Siamo</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;