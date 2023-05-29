import React from "react";
import { NavLink } from "react-router-dom";

function TeamCard({ team }) {



    return (
        <div>
            <div>Team {team.id}: {team.name}</div>
            <div>Coach: {team.coach_id}</div>
            <div>Logo: {team.image_url}</div>
        </div>
  );
}

export default TeamCard;
