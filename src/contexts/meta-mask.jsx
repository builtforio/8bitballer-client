import React, { createContext, useEffect, useState, useMemo, useRef } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding';

const CHAIN_IDS = {
  '0x4': 'rinkeby',
  '0x1': 'main',
};

export const MetaMaskContext = createContext();

const MetaMaskContextProvider = (props) => {
  let [metaMaskInstalled, setMetaMaskInstalled] = useState(false);
  let [accounts, setAccounts] = useState([]);
  let [chain, setChain] = useState(undefined);
  let onboarding = useRef();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setMetaMaskInstalled(true);
      setChain(CHAIN_IDS[window.ethereum.chainId]);

      if (accounts.length > 0) {
        onboarding.current.stopOnboarding();
      }
    }
  }, [accounts]);

  useEffect(() => {
    function handleAccountsChanged(accounts) {
      setAccounts(accounts);
    }

    function handleChainChanged() {
      document.location.reload();
    }

    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleAccountsChanged);
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      
      return () => {
        window.ethereum.off('accountsChanged', handleAccountsChanged);
        window.ethereum.off('chainChanged', handleChainChanged);
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
    chain,
    metaMaskInstalled,
    connectMetaMask,
  }), [accounts, chain, metaMaskInstalled]);

  return (
    <MetaMaskContext.Provider value={value}>
      {props.children}
    </MetaMaskContext.Provider>
  )
}

export default MetaMaskContextProvider
