import React from "react";

function Message({ message }) {

    return (
        <div>
            <div>Message: {message.content}</div>
            <div>Team ID: {message.team_id}</div>
            <div>Coach ID: {message.author_coach_id}</div>
            <div>Guardian ID: {message.author_guardian_id}</div>
            <div>Timestamp: {message.timestamp}</div>
            <br />
        </div>
  );
}

export default Message;
