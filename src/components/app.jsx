import React, { useState } from 'react';
import Header from './header';
import HireBallerForm from './hire-baller-form';
import teams from '../utils/teams';
import ball from '../assets/images/ball.svg';

const App = () => {
  let [selectedTeam, setSelectedTeam] = useState(teams[0]);
  
  return (
    <section>
      <Header />

      <section className="wrapper pt-16">
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

        <HireBallerForm
          selectedTeam={selectedTeam}
        />

        <ul className="flex flex-wrap">
          {
            teams.map(team => {
              return (
                <li
                  key={team.city}
                  className="h-10 w-10 border-4 mr-2 mb-2 cursor-pointer hover:shadow-md"
                  style={{
                    borderColor: team.colors.secondary,
                    backgroundColor: team.colors.primary,
                  }}
                  role="button"
                  onClick={() => setSelectedTeam(team)}
                >
                </li>
              );
            })
          }
        </ul>
      </section>
    </section>
  );
}

export default App;
