import React from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import CreateTeam from "./CreateTeam";

function CoachesHome() {



    return (
        <div>
            <Header />
            <div>
                <h1>Coaches Home</h1>
                <br />
                <div>My Team</div>
                <br />
                <div>Update Team</div>
                <br />
                <div><NavLink to="/createteam">Create New Team</NavLink></div>
            </div>
        </div>
  );
}

export default CoachesHome;
