import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import MetaMaskContextProvider from './contexts/meta-mask';
import './styles/index.output.css';

ReactDOM.render(
  <MetaMaskContextProvider>
    <App />
  </MetaMaskContextProvider>,
  document.getElementById('root')
);
