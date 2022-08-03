import React from 'react';
import {createRoot} from 'react-dom/client';
import Clients from "./clients";
const container = document.getElementById('bundle');
const root = createRoot(container);
root.render(<Clients />);
