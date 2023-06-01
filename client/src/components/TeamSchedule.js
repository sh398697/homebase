import React from "react";
import { useParams } from "react-router-dom";

function TeamSchedule({ teams, games, coaches }) {

    const team_id = useParams().team_id;
    console.log(team_id);

    console.log(teams);

    //Find the team obecjts in teams list using team_id
    const team = teams.find(team => team.id == team_id);
    console.log(team);

    const coachName = coaches.find(coach => coach.id == team.coach_id).fname + " " + coaches.find(coach => coach.id).lname;

    //Find the game objects in games list using team_id
    const gameArray = games.filter(game => (game.home_team_id == team.id || game.away_team_id == team.id));
    console.log(gameArray);

    const gameRendered = gameArray.map(game => {
        return (
            <div key={game.id}>
                <div><b>Game {game.id}</b></div>
                <div>Date: {game.date}</div>
                <div>Location: {game.location}</div>
                <div>Home Team ID: {game.home_team_id}</div>
                <div>Home Team Runs: {game.home_team_runs}</div>
                <div>Away Team ID: {game.away_team_id}</div>
                <div>Away Team Runs: {game.away_team_runs}</div>
                <div>Status: {game.status}</div>
                <br />
            </div>
        )});

    return (
        <div>
            <div>Team ID: {team.id}</div>
            <div>Team Name: {team.name}</div>
            <div>Coach: {coachName}</div>
            <br />
            <div><b>Schedule of Games</b></div>
            <br />
            <div>{gameRendered}</div>
            
        </div>
  );
}

export default TeamSchedule;
