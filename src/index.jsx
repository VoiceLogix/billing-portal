import React from 'react';
import { createRoot } from 'react-dom/client';
import NavButton from './components/NavButton';

// **No HTML** here—just grab the existing element:
const container = document.querySelector('#nav-buttons');

if (container) {
    const root = createRoot(container);
    root.render(<NavButton label="Navigate" />);
} else {
    console.warn('❌ #nav-buttons element not found; React mount skipped.');
}

// Optionally export something if you want to call it manually:
// export default function mountNavWidget(selector = '.nav-button') { … }
