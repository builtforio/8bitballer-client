import React, { useState } from 'react';
import Header from './header';
import WalletConnect from './wallet-connect';
import HireBallerForm from './hire-baller-form';
import TeamSelect from './team-select';
import TEAMS from '../utils/teams';

const App = () => {
  let [selectedTeam, setSelectedTeam] = useState(TEAMS[0]);
  
  return (
    <section>
      <WalletConnect />

      <section className="wrapper py-16">
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
