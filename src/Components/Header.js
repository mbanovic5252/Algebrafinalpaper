import { React } from "react";

export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <nav className={darkMode ? "dark" : ""}>
      <h4 className="heading">Web chat</h4>
      <div className="toggler">
        <p className="toggler-light">Light</p>
        <div className="toggler-slider" onClick={toggleDarkMode}>
          <div className="toggler-slider-circle"></div>
        </div>
        <p className="toggler-dark">Dark</p>
      </div>
    </nav>
  );
}
