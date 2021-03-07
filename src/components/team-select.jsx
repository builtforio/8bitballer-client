import React from 'react';
import ReactTooltip from 'react-tooltip';

const TeamSelect = ({ teams, selectedTeam, onSelectTeam }) => {
  return (
    <ul className="flex flex-wrap">
      {
        teams.map(team => {
          let selected = selectedTeam.id === team.id;
          let id = `city_tooltip_${team.city}`;
          
          return (
            <li
              data-tip
              data-for={id}
              key={team.city}
              className="inline-block h-10 w-10 mx-1 mb-2 cursor-pointer relative shadow"
              style={{ backgroundColor: team.colors.secondary }}
              role="button"
              onClick={() => onSelectTeam(team)}
            >
              <div
                className="h-8 w-8 ml-1 mt-1"
                style={{ backgroundColor: team.colors.primary }}
              >
              </div>
              <ReactTooltip id={id}>
                {team.city}
              </ReactTooltip>
              {!selected && (<div className="absolute inset-0 bg-white opacity-25 hover:opacity-0"></div>)}
            </li>
          );
        })
      }
    </ul>
  );
};

export default TeamSelect;
