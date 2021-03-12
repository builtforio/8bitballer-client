import React, { useContext } from 'react';
import { MetaMaskContext } from '../contexts/meta-mask';
import ball from '../assets/images/ball.svg';

function getButtonText(acc, metaMaskInstalled) {
  if (metaMaskInstalled) {
    return acc
      ? `${acc.substring(0, 6)}…${acc.substring(acc.length - 4, acc.length)}`
      : 'Connect your wallet';
  }

  return 'Install MetaMask';
}

const Header = () => {
  let {
    accounts,
    metaMaskInstalled,
    connectMetaMask,
  } = useContext(MetaMaskContext);
  let activeAccount = accounts[0];

  return (
    <header className="grid grid-cols-3 gap-4">
      <div className="col-start-2 text-center">
        <a href="/">
          <img
            className="h-16 w-16 mx-auto mb-2"
            src={ball}
            alt="baller"
          />
          <h1 className="font-bold text-2xl">
            Baller
          </h1>
        </a>
      </div>
      <div className="text-right">
        <button
          type="button"
          className="px-3 py-2 rounded border font-semibold text-sm"
          disabled={metaMaskInstalled && activeAccount}
          onClick={() => connectMetaMask()}
        >
          {getButtonText(activeAccount, metaMaskInstalled)}
        </button>
      </div>
    </header>
  );
};

export default Header;
