import React from 'react';
import './index.css';
import App from './App';
import * as ServiceWorkerRegistration from './serviceWorkerRegistration';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
ServiceWorkerRegistration.register({
  onUpdate: (registration) => {
    if (registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload();
  },
  onSuccess: () => {
    console.log('Service worker registration successful');
  },
});
