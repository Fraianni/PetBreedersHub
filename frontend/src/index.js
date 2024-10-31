import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'; // Importa il componente App.js

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../sw.js', { scope: '/' })
    .then(function (registration) {
      console.log('Service Worker registered successfully with scope:', registration.scope);
    })
    .catch(function (error) {
      console.error('Service Worker registration failed:', error);
    });
}



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app') // Monta il componente App all'interno dell'elemento con l'id "app" in index.html
);
