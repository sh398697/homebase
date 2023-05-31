import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../apiConfig.js";
import "./AddGame.css";

function AddGame({ addGame }) {

    const [newGameDate, setNewGameDate] = useState(new Date());
    const [newGameHomeTeamID, setNewGameHomeTeamID] = useState("");
    const [newGameAwayTeamID, setNewGameAwayTeamID] = useState("");
    const [newGameLocation, setNewGameLocation] = useState("");

    const handleNewGameDate = (e) => setNewGameDate(e.target.value);
    const handleNewGameHomeTeamID = (e) => setNewGameHomeTeamID(e.target.value);
    const handleNewGameAwayTeamID = (e) => setNewGameAwayTeamID(e.target.value);
    const handleNewGameLocation = (e) => setNewGameLocation(e.target.value);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newGame = {
            date: newGameDate,
            home_team_id: newGameHomeTeamID,
            away_team_id: newGameAwayTeamID,
            location: newGameLocation
        };

        const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGame),
        };
        fetch(`${API_URL}/games`, requestOptions)
        .then(
            addGame(newGame),
            navigate("/myteamgames")
        );
    };


    return (
        <div>
            <div>
                <div className="create-game-form-container">
                    <h2>Add a New Game</h2>
                    <form onSubmit={handleSubmit} className="create-game-form">
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
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
                    <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
  );
}

export default AddGame;
