import React from 'react';
import ReactTooltip from 'react-tooltip';

const TeamSelect = ({ teams, selectedTeam, disabled, onSelectTeam }) => {
  return (
    <div className="flex flex-wrap">
      {
        teams.map(team => {
          let selected = selectedTeam.id === team.id;
          let id = `city_tooltip_${team.city}`;
          
          return (
            <button
              data-tip
              data-for={id}
              key={team.id}
              className="h-10 w-10 mx-1 mb-2 cursor-pointer relative"
              disabled={disabled}
              style={{
                backgroundColor: team.colors.secondary,
              }}
              onClick={() => onSelectTeam(team)}
            >
              <div
                className="h-8 w-8 mx-auto"
                style={{ backgroundColor: team.colors.primary }}
              >
              </div>
              <ReactTooltip id={id}>
                {team.city}
              </ReactTooltip>
              {!selected && !disabled && (<div className="absolute inset-0 bg-white opacity-25 hover:opacity-0"></div>)}
              {!selected && disabled && (<div className="absolute inset-0 bg-white opacity-75"></div>)}
            </button>
          );
        })
      }
    </div>
  );
};

export default TeamSelect;
