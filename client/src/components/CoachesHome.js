import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import API_URL from "../apiConfig.js";
import TeamDetails from "./TeamDetails";

function CoachesHome({ loggedInCoach, setLoggedInCoach, teams }) {

    const navigate = useNavigate();

    function handleLogout() {
        fetch(`${API_URL}/coacheslogout`, {
          method: "POST",
        })
        .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then((data) => {
            Cookies.set("token", data.token, { expires: 1 });
            console.log("logout successful")
            setLoggedInCoach('');
            // Set the coach object in the context and navigate to home
            navigate("/");
    
          })
      }
    
    return (
        <div>
            <div>
                <h1>Coaches Home</h1>
                <br />
                <div>
                  <TeamDetails loggedInCoach={loggedInCoach} teams={teams} />
                </div>
                <br />
                <div><NavLink to="/createteam">Create New Team</NavLink></div>
                <br />
                <div><button onClick={handleLogout}>Logout</button></div>
            </div>
        </div>
  );
}

export default CoachesHome;
