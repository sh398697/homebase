import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import API_URL from "../apiConfig.js";

function FamilyHome({ loggedInParent, setLoggedInParent, parents, players, playerparents, teams, games }) {

    const navigate = useNavigate();

    //Find player IDs in playerparents where parent_id is equal to loggedInParent.id
    const myPlayerIDs = playerparents.filter(playerparent => playerparent.parent_id === loggedInParent.id).map(playerparent => playerparent.player_id);

    //Find player info by player IDs
    const myPlayers = players.filter(player => myPlayerIDs.includes(player.id));

    //Find team IDs info using the team_id attribute on players
    const myTeamIDs = myPlayers.map(player => player.team_id);

    console.log(myTeamIDs);

    //Find team info using the team_id attribute on players
    const myTeams = teams.filter(team => myTeamIDs.includes(team.id));

    console.log(myTeams);

    const myTeamArray = myTeams.map(team => {
      return (
        <div key={team.id}>
          <div>Team Name: {team.name}</div>
          <div>Team ID: {team.id}</div>
          <div><NavLink to={`/teamschedule/${team.id}`}>View Team Schedule and Results</NavLink></div>
          <br />
        </div>
      )});

    const myPlayerDisplayArray = myPlayers.map(player => {
      const playerTeamName = teams.filter(team => team.id === player.team_id)[0].name;
      
      return (
        <div key={player.id}>
          <div>Name: {player.fname} {player.lname}</div>
          <div>Age: {player.age}</div>
          <div>Number: {player.number}</div>
          <div>Team: {playerTeamName}</div>
          <br />
          <div><NavLink to={`/teamschedule/${player.team_id}`}>View Team Schedule and Results</NavLink></div>
          <br />
        </div>
      )});


    function handleLogout() {
        fetch(`${API_URL}/parentlogout`, {
          method: "POST",
        })
        .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then((data) => {
            Cookies.set("parent_token", data.token, { expires: 1 });
            console.log("logout successful")
            setLoggedInParent('');
            // Set the parent object in the context and navigate to home
            navigate("/");
    
          })
      }
    
    return (
        <div>
            <div>
                <h1>Family Home</h1>
                <br />
                <div><NavLink to={`/registerplayer`}>Register a Player</NavLink></div>
                <br />
                <div><b>My Players</b></div>
                <div>{myPlayerDisplayArray}</div>
                <br />
                <div><b>My Teams</b></div>
                <div>{myTeamArray}</div>
                <br />
                <div><button onClick={handleLogout}>Logout</button></div>
            </div>
        </div>
  );
}

export default FamilyHome;
