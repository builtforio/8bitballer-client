import React, { useState } from 'react';
import Header from './header';
import WalletConnect from './wallet-connect';
import HireBallerForm from './hire-baller-form';
import TeamSelect from './team-select';
import TEAMS from '../utils/teams';

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const App = () => {
  let [selectedTeam, setSelectedTeam] = useState(TEAMS[getRandomIntInclusive(0, 29)]);
  
  return (
    <section>
      <WalletConnect />

      <section className="wrapper py-12">
        <Header />
        <HireBallerForm
          selectedTeam={selectedTeam}
        />
        <TeamSelect
          teams={TEAMS}
          selectedTeam={selectedTeam}
          onSelectTeam={setSelectedTeam}
        />
      </section>
    </section>
  );
}

export default App;
