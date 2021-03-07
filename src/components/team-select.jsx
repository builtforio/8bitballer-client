import React from 'react';

const TeamSelect = ({ teams, selectedTeam, onSelectTeam }) => {
  return (
    <ul className="flex flex-wrap">
      {
        teams.map(team => {
          let selected = selectedTeam.id === team.id;
          
          return (
            <li
              key={team.city}
              className="h-10 w-10 mr-2 mb-2 cursor-pointer relative shadow"
              style={{ backgroundColor: team.colors.secondary }}
              role="button"
              onClick={() => onSelectTeam(team)}
            >
              <div
                className="h-8 w-8 ml-1 mt-1"
                style={{ backgroundColor: team.colors.primary }}
              >
              </div>

              {!selected && (<div className="absolute inset-0 bg-white opacity-25 hover:opacity-0"></div>)}
            </li>
          );
        })
      }
    </ul>
  );
};

export default TeamSelect;
