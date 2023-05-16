import React, { createContext, useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import API_URL from "./apiConfig";
import Home from "./components/Home";
import TeamList from "./components/TeamList";
import MessageList from "./components/MessageList";


function App() {
  
  const [teams, setTeams] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
      fetch(`${API_URL}/teams`)
          .then((r) => r.json())
          .then(setTeams);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/messages`)
        .then((r) => r.json())
        .then(setMessages);
}, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/teams" element={<TeamList teams={teams} />} />
          <Route path="/messages" element={<MessageList messages={messages} />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
