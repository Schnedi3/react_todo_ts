import { useTheme } from "../../hooks/useTheme";
import { iconTheme } from "../../Routes";

import "./header.css";
import "./themes.css";

export const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "theme-light" ? "theme-dark" : "theme-light");
  };

  return (
    <button className="header" onClick={toggleTheme}>
      <img src={iconTheme} alt="change theme icon" />
      <p>{theme === "theme-light" ? "Dark theme" : " Light theme"}</p>
    </button>
  );
};
