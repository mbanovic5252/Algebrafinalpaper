import { React } from "react";

export default function Input({
  darkMode,
  handleChange,
  handleSubmit,
  inputData,
  message,
}) {
  return (
    <form
      className={darkMode ? "dark" : ""}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <input
        onChange={handleChange}
        value={message}
        name="message"
        type="text"
        placeholder="Enter your message here"
        autoFocus
      />
      <button>Send</button>
    </form>
  );
}
