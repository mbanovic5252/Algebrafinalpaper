import { React, useState, useEffect } from "react";
import "./styles.css";
import MessagesScreen from "./Components/MessagesScreen";
import Header from "./Components/Header";
import Input from "./Components/Input";

export default function App() {
  // //GENERATE RANDOM NAME
  function getRandomFullName() {
    const fullNames = [
      "Beryl Anderson",
      "Joanna Bellingham",
      "Robert Biggs",
      "Mitch Bonham",
      "Carol Brady",
      "Roger Cheetham",
      "Simon Coan",
      "Belinda Cole",
      "Stephen Cook",
      "Jamie Cox",
      "Anna Davey",
      "Susan Driver",
      "Samuel Eaton",
      "Rickard Eriksson",
      "Judy Finch",
      "Pamela Freeman",
      "Bridget Gallagher",
      "Anthony Goosen",
      "David Halbert",
      "Gillian Harries",
      "Jonathan Higson",
      "Benjamin Holder",
      "Diana Hoskins",
      "Nicholas Illsley",
      "Steven Jackson",
      "Susan Johnson",
      "David Jones",
      "John Jones",
      "Richard Lindley",
      "Chris Smith",
      "David Mann",
      "Martin McInnes",
      "Warren Moody",
      "Spencer Nash",
      "John Parker",
      "Sara Perez",
      "Christopher Powell",
      "Elaine Ridgway",
      "David Wain",
      "Andrew Walker",
      "Roy Watt",
      "Nicholas White",
      "Dennis Wilby",
      "Deborah Wong",
    ];
    const fullName = fullNames[Math.floor(Math.random() * fullNames.length)];
    return fullName;
  }
  // GENERATE RANDOM COLOR
  function getRandomColor() {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    );
  }

  const [user, setUser] = useState({
    username: getRandomFullName(),
    color: getRandomColor(),
  });
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState([]);
  const [drone, setDrone] = useState(null);

  const channelId = "Hn8I6NhnUvBePqIM";

  useEffect(() => {
    const drone = new window.Scaledrone(channelId, {
      data: { user },
    });
    drone.on("open", () => {
      setDrone(drone);
      setUser({ ...user, id: drone.clientId });
    });
    drone.on("error", (error) => console.error(error));
    const room = drone.subscribe("observable-room");
    room.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
    });
    room.on("message", (message) => {
      const { data, id, member } = message;
      setMessageArray((prevMessageArray) => {
        return [
          ...prevMessageArray,
          {
            message: data.message,
            id: id,
            type: "MESSAGE",
            user: {
              id: member.id,
              username: member.clientData.user.username,
              color: member.clientData.user.color,
            },
          },
        ];
      });
    });
  }, []);

  function sendMessage(e) {
    e.preventDefault();
    if (message == false) {
      return;
    }
    publishMessage(message);
    setMessage("");
  }

  function publishMessage(message) {
    drone.publish({
      room: "observable-room",
      message: { message },
    });
  }
  // DARK MODE
  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode((prevMode) => !prevMode);
  }

  return (
    <div className="App-container">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <MessagesScreen
        darkMode={darkMode}
        messageArray={messageArray}
        user={user}
        message={message}
      />
      <Input
        darkMode={darkMode}
        handleSubmit={sendMessage}
        handleChange={(e) => setMessage(e.target.value)}
        message={message}
      />
    </div>
  );
}
