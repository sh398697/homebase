import React, { createContext, useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

import API_URL from "./apiConfig";
import Header from "./components/Header";
import Home from "./components/Home";
import Account from "./components/Account";
import CoachesLogin from "./components/CoachesLogin";
import CoachesRegister from "./components/CoachesRegister";
import CoachesHome from "./components/CoachesHome";
import CreateTeam from "./components/CreateTeam";
import MyTeamGames from "./components/MyTeamGames";
import AddGame from "./components/AddGame";
import UpdateGame from "./components/UpdateGame";
import GuardiansLogin from "./components/GuardiansLogin";
import GuardiansRegister from "./components/GuardiansRegister";
import TeamList from "./components/TeamList";
import TeamDetails from "./components/TeamDetails";
import MessageList from "./components/MessageList";


function App() {
  
  const [coaches, setCoaches] = useState([]);
  const [loggedInCoach, setLoggedInCoach] = useState('');
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [messages, setMessages] = useState([]);

  const addTeam = (newTeamObj) => {
    setTeams([...teams, newTeamObj]);
  }

  const addGame = (newGameObj) => {
    setGames([...games, newGameObj]);
  }

  const handleSuccessfulCoachLogin = () => {
    const token = Cookies.get("token");
    if (token) {
      fetch(`${API_URL}/get-coach-data`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((data) => {
          console.log("Use Effect Token called")
          console.log(data);
          const newLoggedInCoach = ({ id: data.id, email: data.email, fname: data.fname, lname: data.lname, phone: data.phone, image_url: data.image_url, team_id: data.team_id });
          setLoggedInCoach(newLoggedInCoach);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      fetch(`${API_URL}/get-coach-data`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((data) => {
          console.log("Use Effect Token called")
          console.log(data);
          const newLoggedInCoach = ({ id: data.id, email: data.email, fname: data.fname, lname: data.lname, phone: data.phone, image_url: data.image_url, team_id: data.team_id });
          (setLoggedInCoach(newLoggedInCoach));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  useEffect(() => {
      fetch(`${API_URL}/teams`)
          .then((r) => r.json())
          .then(setTeams);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/games`)
        .then((r) => r.json())
        .then(setGames);
}, []);

  useEffect(() => {
    fetch(`${API_URL}/messages`)
        .then((r) => r.json())
        .then(setMessages);
}, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/account" element={<Account />} />
          <Route path="/coachesregister" element={<CoachesRegister coaches={coaches} setCoaches={setCoaches} />} />
          <Route path="/coacheslogin" element={<CoachesLogin handleSuccessfulCoachLogin={handleSuccessfulCoachLogin} />} />
          <Route path="/coacheshome" element={<CoachesHome loggedInCoach={loggedInCoach} setLoggedInCoach={setLoggedInCoach} />} />
          <Route path="/createteam" element={<CreateTeam loggedInCoach={loggedInCoach} addTeam={addTeam} />} />
          <Route path="/myteam" element={<TeamDetails loggedInCoach={loggedInCoach} teams={teams} />} />
          <Route path="/myteamgames" element={<MyTeamGames loggedInCoach={loggedInCoach} teams={teams} games={games} />} />
          <Route path="/addgame" element={<AddGame addGame={addGame} />} />
          <Route path="/updategame/:game_id" element={<UpdateGame games={games} />} />
          <Route path="/guardiansregister" element={<GuardiansRegister />} />
          <Route path="/guardianslogin" element={<GuardiansLogin />} />
          <Route path="/teams" element={<TeamList teams={teams} />} />
          <Route path="/messages" element={<MessageList messages={messages} />} />
          <Route path="/" element={<Home loggedInCoach={loggedInCoach} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
