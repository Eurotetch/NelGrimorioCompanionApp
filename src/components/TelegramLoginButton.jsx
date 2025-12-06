import React, { useEffect, useRef } from 'react';

const TelegramLoginButton = ({ botUsername = 'NelGrimorioCompanionApp_bot', onAuth, buttonSize = 'large' }) => {
  const containerRef = useRef(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Previeni inizializzazioni multiple
    if (isInitialized.current) return;

    // Callback globale per Telegram (solo una volta)
    if (!window.onTelegramAuth) {
      window.onTelegramAuth = (user) => {
        console.log('Telegram auth callback:', user);
        onAuth({
          id: user.id.toString(),
          firstName: user.first_name,
          lastName: user.last_name || '',
          username: user.username || '',
          photoUrl: user.photo_url || null,
          authDate: user.auth_date,
          hash: user.hash
        });
      };
    }

    // Crea lo script del widget solo se non esiste già
    if (!document.getElementById('telegram-login-script')) {
      const script = document.createElement('script');
      script.id = 'telegram-login-script';
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.setAttribute('data-telegram-login', botUsername);
      script.setAttribute('data-size', buttonSize);
      script.setAttribute('data-radius', '8');
      script.setAttribute('data-request-access', 'write');
      script.setAttribute('data-userpic', 'true');
      script.setAttribute('data-onauth', 'onTelegramAuth(user)');
      script.async = true;

      if (containerRef.current) {
        containerRef.current.appendChild(script);
        isInitialized.current = true;
      }
    }

    // Cleanup: non rimuovere il callback globale per evitare errori
    return () => {
      // Non fare cleanup del callback per permettere al widget di funzionare
    };
  }, []); // Dipendenze vuote = esegui solo una volta

  return (
    <div 
      ref={containerRef} 
      className="flex justify-center"
      style={{ minHeight: '40px' }}
    />
  );
};

export default TelegramLoginButton;