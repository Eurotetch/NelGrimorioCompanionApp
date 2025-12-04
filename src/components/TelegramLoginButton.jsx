import React, { useEffect, useRef } from 'react';

const TelegramLoginButton = ({ botUsername = 'NelGrimorioCompanionApp_bot', onAuth, buttonSize = 'large' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Rimuovi eventuali script precedenti
    const existingScript = document.getElementById('telegram-login-script');
    if (existingScript) {
      existingScript.remove();
    }

    // Crea lo script del widget
    const script = document.createElement('script');
    script.id = 'telegram-login-script';
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', botUsername);
    script.setAttribute('data-size', buttonSize);
    script.setAttribute('data-radius', '8');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-userpic', 'true');
    script.async = true;

    // Callback globale per Telegram
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

    script.setAttribute('data-onauth', 'onTelegramAuth(user)');

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (window.onTelegramAuth) {
        delete window.onTelegramAuth;
      }
    };
  }, [botUsername, buttonSize, onAuth]);

  return (
    <div 
      ref={containerRef} 
      className="flex justify-center"
      style={{ minHeight: '40px' }}
    />
  );
};

export default TelegramLoginButton;