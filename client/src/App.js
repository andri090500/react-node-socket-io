import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      <h2>Hello World</h2>
      <input
        placeholder="message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>send</button>
      <h2>Message:</h2>
      {messageReceived}
    </div>
  );
}

export default App;
