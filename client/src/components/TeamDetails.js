import React from "react";
import { NavLink } from "react-router-dom";

function TeamDetails({ loggedInCoach, teams }) {

    const myTeamArray = teams.filter(team => team.coach_id === loggedInCoach.id);
    const team = myTeamArray[0];

    return (
        <div>
            <div>Team ID: {team.id}</div>
            <div>Name: {team.name}</div>
            <div>Coach: {loggedInCoach.fname} {loggedInCoach.lname}</div>
            <div>Logo: {team.image_url}</div>
            <br />
            <div><NavLink to="/myteamgames">Manage games and schedule</NavLink></div>
        </div>
  );
}

export default TeamDetails;
