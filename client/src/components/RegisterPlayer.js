import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../apiConfig.js";
import "./CreateTeam.css";


function RegisterPlayer({ loggedInParent, addPlayer }) {
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newAge, setNewAge] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newImageURL, setNewImageURL] = useState("");
    const [newTeamID, setNewTeamID] = useState("");

    const handleFirstName = (e) => setNewFirstName(e.target.value);
    const handleLastName = (e) => setNewLastName(e.target.value);
    const handleAge = (e) => setNewAge(e.target.value);
    const handleNumber = (e) => setNewNumber(e.target.value);
    const handleImageURL = (e) => setNewImageURL(e.target.value);
    const handleTeamID = (e) => setNewTeamID(e.target.value);

    const navigate = useNavigate();

    const addPlayerParentRecord = (player) => {
        const playerParent = {
            player_id: player.id,
            parent_id: loggedInParent.id,
        }
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(playerParent),
            };
            fetch(`${API_URL}/playerparents`, requestOptions)
            .then(
                addPlayer(player),
                navigate("/familyhome")
            );
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPlayer = {
            fname: newFirstName,
            lname: newLastName,
            age: newAge,
            number: newNumber,
            image_url: newImageURL,
            team_id: newTeamID
        };

        const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlayer),
        };
        fetch(`${API_URL}/players`, requestOptions)
            .then((r) => r.json())
            .then((player) => {
                addPlayerParentRecord(player);
            })
        };

    return (
        <div>
            <div className="create-user-container">
                <div className="create-user-form-container">
                    <h2>Create Your Team</h2>
                    <form onSubmit={handleSubmit} className="create-user-form">
                    <div className="form-group">
                        <label htmlFor="fname">First Name</label>
                        <input
                        type="text"
                        id="fname"
                        value={newFirstName}
                        onChange={handleFirstName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lname">Last Name</label>
                        <input
                        type="text"
                        id="lname"
                        value={newLastName}
                        onChange={handleLastName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Current Age</label>
                        <input
                        type="integer"
                        id="age"
                        value={newAge}
                        onChange={handleAge}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="number">Jersy Number</label>
                        <input
                        type="integer"
                        id="number"
                        value={newNumber}
                        onChange={handleNumber}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="number">Photo URL</label>
                        <input
                        type="text"
                        id="image"
                        value={newImageURL}
                        onChange={handleImageURL}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="teamid">Team ID</label>
                        <input
                        type="text"
                        id="teamid"
                        value={newTeamID}
                        onChange={handleTeamID}
                        />
                    </div>
                    <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
  );
}

export default RegisterPlayer;
