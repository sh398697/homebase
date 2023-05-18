import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import API_URL from "../apiConfig.js";

function CoachesHome({ loggedInCoach, setloggedInCoach }) {

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
            setloggedInCoach('');
            // Set the coach object in the context and navigate to home
            navigate("/coacheshome");
    
          })
      }

    return (
        <div>
            <div>
                <h1>Coaches Home</h1>
                <br />
                <div>My Team</div>
                <br />
                <div>Update Team</div>
                <br />
                <div><NavLink to="/createteam">Create New Team</NavLink></div>
                <br />
                <div><button onClick={handleLogout}>Logout</button></div>
            </div>
        </div>
  );
}

export default CoachesHome;
