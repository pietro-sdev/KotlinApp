import { createRoot } from 'react-dom/client';

import { App } from './App';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@measured/puck/puck.css';

import './styles/index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);
