import React from "react";

function TeamCard({ team }) {



    return (
        <div>
            <div>Team {team.id}: {team.name}</div>
            <div>Coach: {team.coach_id}</div>
            <div>Logo: {team.image_url}</div>
            <br />
        </div>
  );
}

export default TeamCard;
