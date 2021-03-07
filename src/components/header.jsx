import React, { useContext } from 'react';
import { MetaMaskContext } from '../contexts/meta-mask';

function getButtonText(acc, metaMaskInstalled) {
  if (metaMaskInstalled) {
    return acc
      ? `${acc.substring(0, 6)}…${acc.substring(acc.length - 4, acc.length)}`
      : 'Connect your wallet';
  }

  return 'Install MetaMask';
}

const HeaderButton = ({ children, buttonClassName, onClick }) => {
  return (
    <button
      type="button"
      className={`rounded-md border font-semibold text-sm flex items-center h-9 px-2 lg:h-12 lg:px-3 ${buttonClassName}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Header = () => {
  let { accounts, metaMaskInstalled, connectMetaMask } = useContext(MetaMaskContext);

  let activeAccount = accounts[0];

  return (
    <header className="flex justify-end px-12 py-6">
      <HeaderButton
        buttonClassName="ml-2 lg:ml-4"
        iconKey="wallet"
        iconClassName="text-town-blue-300"
        onClick={() => connectMetaMask()}
      >
        <span className="hidden lg:inline ml-2">
          {getButtonText(activeAccount, metaMaskInstalled)}
        </span>
      </HeaderButton>
    </header>
  );
}

export default Header;
