import React, { createContext, useEffect, useState, useMemo, useRef } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding';

export const MetaMaskContext = createContext();

const MetaMaskContextProvider = (props) => {
  let [metaMaskInstalled, setMetaMaskInstalled] = useState(false);
  let [accounts, setAccounts] = useState([]);
  let onboarding = useRef();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setMetaMaskInstalled(true);

      if (accounts.length > 0) {
        onboarding.current.stopOnboarding();
      }
    }
  }, [accounts]);

  useEffect(() => {
    function handleAccountsChanged(accounts) {
      setAccounts(accounts);
    }

    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleAccountsChanged);
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        window.ethereum.off('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  const connectMetaMask = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts) => setAccounts(newAccounts));
    } else {
      onboarding.current.startOnboarding();
    }
  };

  let value = useMemo(() => ({
    accounts,
    metaMaskInstalled,
    connectMetaMask,
  }), [accounts, metaMaskInstalled]);

  return (
    <MetaMaskContext.Provider value={value}>
      {props.children}
    </MetaMaskContext.Provider>
  )
}

export default MetaMaskContextProvider
