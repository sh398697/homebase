import React from "react";
import { NavLink } from "react-router-dom";
import GameCard from "./GameCard";

function MyTeamGames({ loggedInCoach, teams, games }) {

    const myTeamArray = teams.filter(team => team.coach_id === loggedInCoach.id);
    const team = myTeamArray[0];

    const gameArray = games.filter(game => (game.home_team_id === team.id || game.away_team_id === team.id));

    const gameCardArray = gameArray.map( gameObj => {
        return <GameCard key={gameObj.id} game={gameObj} />  
      } )
        
    return (
        <div>
            <div>My Team's Games</div>
            <br />
            <div>{gameCardArray}</div>
            <div><NavLink to="/addgame">Add a Game to schedule</NavLink></div>
        </div>
  );
}

export default MyTeamGames;
