import { React, useRef, useEffect } from "react";

export default function MessagesScreen({ darkMode, messageArray, user }) {
  // ADD SCROLL TO LAST MESSAGE
  const endOfMessagesRef = useRef();
  function scrollToBottom() {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messageArray]);

  // RENDER THE MESSAGE
  function renderMessage(message) {
    return (
      <li
        className={`${
          user.id === message.user.id ? "my-message" : "others-message"
        }`}
      >
        <span
          className="colorAvatar"
          style={{ backgroundColor: message.user.color }}
        />
        <div className="message-content">
          <div className="username">{message.user.username}</div>
          <div className="text">{message.message}</div>
        </div>
      </li>
    );
  }

  return (
    <main className={darkMode ? "dark" : ""}>
      <div className="">
        {messageArray.map((message) => {
          return (
            <>
              <ul key={message.id}>{renderMessage(message)}</ul>
              <div key={Math.random()} ref={endOfMessagesRef} />
            </>
          );
        })}
      </div>
    </main>
  );
}
