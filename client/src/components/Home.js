import React from "react";
import Header from "./Header";
import "./Home.css";

function Home({ loggedInCoach }) {



    return (
        <div>
            <Header />
            <div className="home-container">
                <div className="home-content">
                    <div>{loggedInCoach ? loggedInCoach.fname : ("Not logged in")}</div>
                    <h1>Welcome to HomeBase</h1>
                    <p>The ultimate online hub for teams to stay connected, share laughs, and coordinate schedules.</p>
                </div>
            </div>
        </div>
  );
}

export default Home;
