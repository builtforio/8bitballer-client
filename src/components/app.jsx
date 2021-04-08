import React, { useState } from 'react';
import moment from 'moment';
import Header from './header';
import Footer from './footer';
import HireBallerForm from './hire-baller-form';
import TeamSelect from './team-select';
import TEAMS from '../utils/teams';
import { getRandomIntInclusive } from '../utils/math';
import useInterval from '../hooks/use-interval';
import basketball from '../assets/images/ball.svg';

const READY_TO_RELEASE = false;
const RELEASE_TIME = 1618070400;

const App = () => {
  function getTimeRemaining() { 
    let currentTime = moment();
    let releaseTime = moment.unix(RELEASE_TIME);
    let remaining = moment.duration(releaseTime.diff(currentTime));

    function getFormatted(int) {
      if (int === 0) {
        return;
      }
      
      if (int.toString().length === 1) {
        return `0${int}`;
      }

      return int.toString();
    }

    let times = [
      remaining.days(),
      remaining.hours(),
      remaining.minutes(),
      remaining.seconds(),
    ].map(getFormatted).filter(formatted => !!formatted);

    return `${times.join(':')}`
  }

  let [selectedTeam, setSelectedTeam] = useState(TEAMS[getRandomIntInclusive(0, 29)]);
  let [hasActiveTrx, setHasActiveTrx] = useState(false);
  let [timeRemaining, setTimeRemaining] = useState(getTimeRemaining())

  useInterval(() => {
    setTimeRemaining(getTimeRemaining());
  }, 1000);
  
  if (!READY_TO_RELEASE) {
    return (
      <section className="flex flex-col justify-center h-screen max-w-screen-md mx-auto">
        <img
          className="mx-auto mb-6"
          src={basketball}
          alt="8bit Ballers"
        />

        <span className="block text-center text-3xl mb-6">
          {timeRemaining}
        </span>

        <p className="text-center mb-6">
          Collect your favorite team's Baller. The cost of each team's baller will increase by <strong>0.1 ETH</strong> every time someone picks up their favorite!
        </p>

        <p className="text-center">
          Only <strong>100</strong> Ballers for each team will be generated.
        </p>
      </section>
    );
  }

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
