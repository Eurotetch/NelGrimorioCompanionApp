import React, { useEffect, useRef } from 'react';

const TelegramLoginButton = ({ botUsername, onAuth }) => {
  const containerRef = useRef(null);
  const callbackName = useRef(`telegramCallback_${Date.now()}`);

  useEffect(() => {
    // Crea callback globale unica
    window[callbackName.current] = (user) => {
      console.log('✅ Telegram auth ricevuta:', user);
      onAuth({
        id: user.id.toString(),
        firstName: user.first_name,
        lastName: user.last_name || '',
        username: user.username || '',
        photoUrl: user.photo_url || null
      });
    };

    // Crea script widget
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', botUsername);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-onauth', `${callbackName.current}(user)`);
    script.setAttribute('data-request-access', 'write');

    containerRef.current?.appendChild(script);

    return () => {
      delete window[callbackName.current];
    };
  }, [botUsername, onAuth]);

  return <div ref={containerRef} className="flex justify-center" />;
};

export default TelegramLoginButton;