import React from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";

function Account() {



    return (
        <div>
            <div>
                <div>
                    <h1>Account</h1>
                    <br />
                    <div><NavLink to="/coacheslogin">Coaches Login</NavLink></div>
                    <br />
                    <div><NavLink to="/coachesregister">Coaches Register</NavLink></div>
                    <br />
                    <div><NavLink to="/guardianslogin">Parent/Guardian Login</NavLink></div>
                    <br />
                    <div><NavLink to="/guardianslogin">Parent/Guardian Register</NavLink></div>
                </div>
            </div>
        </div>
  );
}

export default Account;
