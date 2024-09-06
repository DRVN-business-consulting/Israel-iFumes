import React, { createContext, useState } from "react";

// Define themes with background and text colors
const themes = {
  light: {
    background: "#FFFFFF",
    text: "#000000",
  },
  dark: {
    background: "#121212",
    text: "#FFFFFF",
  },
};

// Define primary colors
const primaryColors = {
  blue: "#22B1DD",
  green: "#1DB954",
  red: "#FF4B3E",
};

// Create the context
export const ThemeContext = createContext();

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);
  const [primaryColor, setPrimaryColor] = useState(primaryColors.blue);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === themes.light ? themes.dark : themes.light
    );
  };

  const changePrimaryColor = (color) => {
    setPrimaryColor(primaryColors[color] || primaryColors.blue);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, primaryColor, toggleTheme, changePrimaryColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
