import React, { useState } from 'react';
import Header from './header';
import Footer from './footer';
import HireBallerForm from './hire-baller-form';
import TeamSelect from './team-select';
import TEAMS from '../utils/teams';
import { getRandomIntInclusive } from '../utils/math';

const App = () => {
  let [selectedTeam, setSelectedTeam] = useState(TEAMS[getRandomIntInclusive(0, 29)]);
  let [hasActiveTrx, setHasActiveTrx] = useState(false);
  
  return (
    <section className="wrapper pt-12 pb-24">
      <Header />
      <HireBallerForm
        selectedTeam={selectedTeam}
        hasActiveTrx={hasActiveTrx}
        onSetHasActiveTrx={(val) => setHasActiveTrx(val)}
      />
      <TeamSelect
        teams={TEAMS}
        selectedTeam={selectedTeam}
        disabled={hasActiveTrx}
        onSelectTeam={setSelectedTeam}
      />
      <Footer />
    </section>
  );
}

export default App;
