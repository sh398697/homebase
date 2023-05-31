import React from "react";
import { NavLink } from "react-router-dom";

function GameCard({ game }) {



    return (
        <div>
            <div>Date: {game.date}</div>
            <div>Location: {game.location}</div>
            <div>Home Team: {game.home_team_id}</div>
            <div>Away Team: {game.away_team_id}</div>
            <div>Status: {game.status}</div>
            <div>Home Team Runs: {game.home_team_runs}</div>
            <div>Away Team Runs: {game.away_team_runs}</div>
            <div>Result: {game.game_result}</div>
            <div><NavLink to={`/updategame/${game.id}`}>Update Game</NavLink></div>
            <br />
        </div>
  );
}

export default GameCard;
