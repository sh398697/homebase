import React from "react";
import Header from "./Header";
import Message from "./Message";

function MessageList({ messages }) {

    const messageObjArray = messages.map( messageObj => {
        return <Message key={messageObj.id} message={messageObj} />  
      } )

    return (
        <div>
            <div>{messageObjArray}</div>
        </div>
  );
}

export default MessageList;
