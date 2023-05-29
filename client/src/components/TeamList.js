import React from "react";
import TeamCard from "./TeamCard";

function TeamList({ teams }) {

    const teamObjArray = teams.map( teamObj => {
        return <TeamCard key={teamObj.id} team={teamObj} />  
      } )

    return (
        <div>
            <div>{teamObjArray}</div>
        </div>
  );
}

export default TeamList;
