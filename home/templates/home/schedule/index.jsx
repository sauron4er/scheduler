import React from 'react';
import {createRoot} from 'react-dom/client';
import Schedule from 'home/templates/home/schedule/schedule';
const container = document.getElementById('bundle');
const root = createRoot(container);
root.render(<Schedule />);
