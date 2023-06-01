import { useState, useContext } from "react";
import Header from "./Header";
import "./Home.css";
import { CoachContext } from "../context/coach";

function Home({ loggedInParent }) {

    const { loggedInCoach, setLoggedInCoach } = useContext(CoachContext);

    return (
        <div>
            <div className="home-container">
                <div className="home-content">
                    <div>{loggedInCoach ? loggedInCoach.fname : null}</div>
                    <div>{loggedInParent ? loggedInParent.fname : null}</div>
                    <h1>Welcome to HomeBase</h1>
                    <p>The ultimate online hub for teams to stay connected and coordinate schedules.</p>
                </div>
            </div>
        </div>
  );
}

export default Home;
