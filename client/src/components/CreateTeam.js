import React, { useState, useContext } from "react";
import API_URL from "../apiConfig.js";
import Header from "./Header.js";
import "./CreateTeam.css";


function CreateTeam() {
    const [newTeamName, setNewTeamName] = useState("");
    const [newImageURL, setNewImageURL] = useState("");

    const handleTeamName = (e) => setNewTeamName(e.target.value);
    const handleImageURL = (e) => setNewImageURL(e.target.value);

    const onCreateTeam = (teamObj) => {
    //setUser(coachObj);
    //history("/coacheslogin");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTeam = {
        name: newTeamName,
        image_url: newImageURL
        };

        const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTeam),
        };
        fetch(`${API_URL}/teams`, requestOptions).then(onCreateTeam);
    };


    return (
        <div>
            <Header />
            <div className="create-team-container">
                <div className="create-team-form-container">
                    <h2>Create Your Team</h2>
                    <form onSubmit={handleSubmit} className="create-team-form">
                    <div className="form-group">
                        <label htmlFor="name">Team Name</label>
                        <input
                        type="text"
                        id="name"
                        value={newTeamName}
                        onChange={handleTeamName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Team Logo URL</label>
                        <input
                        type="text"
                        id="image_url"
                        value={newImageURL}
                        onChange={handleImageURL}
                        />
                    </div>
                    <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
  );
}

export default CreateTeam;
