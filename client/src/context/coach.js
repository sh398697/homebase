import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { API_URL } from "../apiConfig";

// create the context
const CoachContext = createContext();

// create a provider component
function CoachProvider({ children }) {
    const [loggedInCoach, setLoggedInCoach] = useState(null);
  // the value prop of the provider will be our context data
  // this value will be available to child components of this provider
  return <CoachContext.Provider value={{loggedInCoach, setLoggedInCoach}}>{children}</CoachContext.Provider>;
}

export { CoachContext, CoachProvider };