import React, { useState } from 'react';

const themes = {
  light: {
    foreground: "magenta",
    background: "#ffffff",
    middleground: "#161011",
    slider: false,
    name: "light",
    mixBlendMode: "multiply",
    mixBlendModeBackground: "difference"
  },
  dark: {
    foreground: "#f0a5a3",
    background: "#161011",
    middleground: "#ffffff",
    slider: true,
    name: "dark",
    mixBlendMode: "difference",
    mixBlendModeForeground: "multiply"
  }
};



const ThemeContext = React.createContext({theme: themes.light,
                                          toggleTheme: () => {} });

export { ThemeContext, themes };
