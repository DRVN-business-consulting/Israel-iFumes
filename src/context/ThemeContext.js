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
  // State for the current theme and primary color
  const [theme, setTheme] = useState(themes.dark); // Default to light theme
  const [primaryColor, setPrimaryColor] = useState(primaryColors.blue); // Default to blue

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === themes.light ? themes.dark : themes.light
    );
  };

  // Function to change the primary color
  const changePrimaryColor = (color) => {
    setPrimaryColor(primaryColors[color] || primaryColors.blue); // Default to blue if color not found
  };

  return (
    <ThemeContext.Provider
      value={{ theme, primaryColor, toggleTheme, changePrimaryColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
