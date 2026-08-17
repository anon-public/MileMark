import React, { createContext, useContext, useState } from 'react';
import { useThemeStore } from '../store/useThemeStore';

import light from './modes/lightTheme';
import dark from './modes/darkTheme';
import study from './modes/studyTheme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const { theme: mode } = useThemeStore();

    const themes = {
        light, dark, study
    }
    const theme = themes[mode] ?? themes['light'];
    return (
        <ThemeContext.Provider
            value={{
                theme,
                mode,

            }}>

            {children}
        </ThemeContext.Provider>

    )
}
export const useTheme = () =>
    useContext(ThemeContext);
