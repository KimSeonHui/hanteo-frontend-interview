import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import '@/styles/index.scss';
import App from './App.tsx';
import { colors } from './styles/color.ts';
import { fonts } from './styles/font.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={{ colors, fonts }}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
