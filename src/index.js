import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { ToastProvider } from 'react-toast-notifications';
import MetaMaskContextProvider from './contexts/meta-mask';
import './styles/index.output.css';

ReactDOM.render(
  <ToastProvider placement="bottom-right">
    <MetaMaskContextProvider>
      <App />
    </MetaMaskContextProvider>
  </ToastProvider>,
  document.getElementById('root')
);
