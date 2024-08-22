import React from 'react';
import App from './app/App.tsx';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from './theme/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode="light" />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
