import './styles/main.scss';

import NoteApp from './lib/NoteApp';

NoteApp.init();

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register('/service-worker.js');
}