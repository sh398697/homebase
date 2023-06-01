import React, { createContext, useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { CoachProvider } from "./context/coach";

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
import FamilyRegister from "./components/FamilyRegister";
import FamilyLogin from "./components/FamilyLogin";
import FamilyHome from "./components/FamilyHome";
import RegisterPlayer from "./components/RegisterPlayer";
import TeamList from "./components/TeamList";
import TeamDetails from "./components/TeamDetails";
import TeamSchedule from "./components/TeamSchedule";


function App() {
  
  const [coaches, setCoaches] = useState([]);
  const [loggedInCoach, setLoggedInCoach] = useState('');
  const [parents, setParents] = useState([]);
  const [loggedInParent, setLoggedInParent] = useState('');
  const [players, setPlayers] = useState([]);
  const [playerparents, setPlayerParents] = useState([]);
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [testString, setTestString] = useState("scott");

  const addTeam = (newTeamObj) => {
    setTeams([...teams, newTeamObj]);
  }

  const addGame = (newGameObj) => {
    setGames([...games, newGameObj]);
  }

  const addPlayer = (newPlayerObj) => {
    setPlayers([...players, newPlayerObj]);
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

  const handleSuccessfulParentLogin = () => {
    const token = Cookies.get("parent_token");
    if (token) {
      fetch(`${API_URL}/get-parent-data`, {
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
          const newLoggedInParent = ({ id: data.id, email: data.email, fname: data.fname, lname: data.lname, phone: data.phone, image_url: data.image_url });
          setLoggedInParent(newLoggedInParent);
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
    const token = Cookies.get("parent_token");
    if (token) {
      fetch(`${API_URL}/get-parent-data`, {
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
          const newLoggedInParent = ({ id: data.id, email: data.email, fname: data.fname, lname: data.lname, phone: data.phone, image_url: data.image_url});
          (setLoggedInParent(newLoggedInParent));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/coaches`)
        .then((r) => r.json())
        .then(setCoaches);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/parents`)
        .then((r) => r.json())
        .then(setParents);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/players`)
        .then((r) => r.json())
        .then(setPlayers);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/playerparents`)
        .then((r) => r.json())
        .then(setPlayerParents);
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


  return (
    <div className="App">
      <CoachProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/account" element={<Account />} />
            <Route path="/coachesregister" element={<CoachesRegister coaches={coaches} setCoaches={setCoaches} />} />
            <Route path="/coacheslogin" element={<CoachesLogin handleSuccessfulCoachLogin={handleSuccessfulCoachLogin} />} />
            <Route path="/coacheshome" element={<CoachesHome teams={teams} loggedInCoach={loggedInCoach} setLoggedInCoach={setLoggedInCoach} />} />
            <Route path="/createteam" element={<CreateTeam loggedInCoach={loggedInCoach} addTeam={addTeam} />} />
            <Route path="/myteam" element={<TeamDetails loggedInCoach={loggedInCoach} teams={teams} />} />
            <Route path="/myteamgames" element={<MyTeamGames loggedInCoach={loggedInCoach} teams={teams} games={games} />} />
            <Route path="/teamschedule/:team_id" element={<TeamSchedule teams={teams} coaches={coaches} games={games}/>} />
            <Route path="/addgame" element={<AddGame addGame={addGame} />} />
            <Route path="/updategame/:game_id" element={<UpdateGame games={games} />} />
            <Route path="/familyregister" element={<FamilyRegister parents={parents} setParents={setParents} />} />
            <Route path="/familylogin" element={<FamilyLogin handleSuccessfulParentLogin={handleSuccessfulParentLogin} />} />
            <Route path="/familyhome" element={<FamilyHome loggedInParent={loggedInParent} setLoggedInParent={setLoggedInParent} parents={parents} players={players} playerparents={playerparents} teams={teams} games={games} />} />
            <Route path="/registerplayer" element={<RegisterPlayer loggedInParent={loggedInParent} addPlayer={addPlayer} />} />
            <Route path="/teams" element={<TeamList teams={teams} />} />
            <Route path="/" element={<Home loggedInCoach={loggedInCoach} loggedInParent={loggedInParent}/>} />
          </Routes>
        </Router>
      </CoachProvider>
    </div>
  );
}

export default App;
