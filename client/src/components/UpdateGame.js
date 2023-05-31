import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../apiConfig.js";
import "./AddGame.css";

function UpdateGame({ games }) {

    const game_id = useParams().game_id;
    console.log(game_id);
    
    //Find the game with the id matching game_id
    const gameArray = games.map((game) => {
        if (game.id == game_id) {
            return game;
        }
        else {
            return
        }});
    
    const newGameArray = gameArray.filter((game) => {
        if (game) {
            return game;
        }});
    
    const game = newGameArray[0];

    const [newGameDate, setNewGameDate] = useState(new Date(game.date));
    const [newGameHomeTeamID, setNewGameHomeTeamID] = useState(game.home_team_id);
    const [newGameAwayTeamID, setNewGameAwayTeamID] = useState(game.away_team_id);
    const [newGameLocation, setNewGameLocation] = useState(game.location);
    const [newGameStatus, setNewGameStatus] = useState(game.status);
    const [newGameHomeTeamRuns, setNewGameHomeTeamRuns] = useState(game.home_team_runs);
    const [newGameAwayTeamRuns, setNewGameAwayTeamRuns] = useState(game.away_team_runs);
    const [newGameResult, setNewGameResult] = useState(game.game_result);

    const handleNewGameDate = (e) => setNewGameDate(e.target.value);
    const handleNewGameHomeTeamID = (e) => setNewGameHomeTeamID(e.target.value);
    const handleNewGameAwayTeamID = (e) => setNewGameAwayTeamID(e.target.value);
    const handleNewGameLocation = (e) => setNewGameLocation(e.target.value);
    const handleNewGameStatus = (e) => setNewGameStatus(e.target.value);
    const handleNewGameHomeTeamRuns = (e) => setNewGameHomeTeamRuns(e.target.value);
    const handleNewGameAwayTeamRuns = (e) => setNewGameAwayTeamRuns(e.target.value);
    const handleNewGameResult = (e) => setNewGameResult(e.target.value);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newGame = {
            date: newGameDate,
            home_team_id: newGameHomeTeamID,
            away_team_id: newGameAwayTeamID,
            location: newGameLocation,
            status: newGameStatus,
            home_team_runs: newGameHomeTeamRuns,
            away_team_runs: newGameAwayTeamRuns,
            game_result: newGameResult
        };

        const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGame),
        };
        fetch(`${API_URL}/games/${game_id}`, requestOptions)
        .then(
            navigate("/myteamgames")
        );
    };

    function handleDeleteGame() {

        const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        };
        fetch(`${API_URL}/games/${game_id}`, requestOptions)
       .then(
        navigate("/myteamgames")
       )
    }

    return (
        <div>
            <div>
                <div className="create-game-form-container">
                    <h2>Update Game</h2>
                    <form onSubmit={handleSubmit} className="create-game-form">
                    <div className="form-group">
                        <label htmlFor="date">Date: {game.date}</label>
                        <input
                            type="date"
                            id="date"
                            value={newGameDate}
                            onChange={handleNewGameDate}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="home_team_id">Home Team ID</label>
                        <input
                        type="text"
                        id="home_team_id"
                        value={newGameHomeTeamID}
                        onChange={handleNewGameHomeTeamID}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="away_team_id">Away Team ID</label>
                        <input
                        type="text"
                        id="away_team_id"
                        value={newGameAwayTeamID}
                        onChange={handleNewGameAwayTeamID}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                        type="text"
                        id="location"
                        value={newGameLocation}
                        onChange={handleNewGameLocation}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <input
                        type="text"
                        id="status"
                        value={newGameStatus}
                        onChange={handleNewGameStatus}
                        />
                    </div>
                    <div className="form-group">
                        <label>Home Team Runs</label>
                        <input
                        type="integer"
                        id="home_team_runs"
                        value={newGameHomeTeamRuns}
                        onChange={handleNewGameHomeTeamRuns}
                        />
                    </div>
                    <div className="form-group">
                        <label>Away Team Runs</label>
                        <input
                        type="integer"
                        id="away_team_runs"
                        value={newGameAwayTeamRuns}
                        onChange={handleNewGameAwayTeamRuns}
                        />
                    </div>
                    <div className="form-group">
                        <label>Game Result</label>
                        <input
                        type="text"
                        id="game_result"
                        value={newGameResult}
                        onChange={handleNewGameResult}
                        />
                    </div>
                    <button type="submit">Submit</button>
                    </form>
                </div>
                <div><button onClick={handleDeleteGame}>Delete Game</button></div>
            </div>
        </div>
  );
}

export default UpdateGame;
