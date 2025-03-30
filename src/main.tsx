import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import '@/styles/index.scss';
import App from './App.tsx';
import { colors } from './styles/color.ts';
import { fonts } from './styles/font.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={{ colors, fonts }}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
