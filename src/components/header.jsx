import React from 'react';
import ball from '../assets/images/ball.svg';

const Header = () => {
  return (
    <header className="text-center">
      <img
        className="h-16 w-16 mx-auto mb-2"
        src={ball}
        alt="baller"
      />
      <h1 className="font-bold text-2xl">
        Baller
      </h1>
    </header>
  );
};

export default Header;
