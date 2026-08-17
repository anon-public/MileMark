import { create } from 'zustand';
import { getSettings, setSettings } from '../database/DB';

export const useThemeStore = create((set) => ({
    theme: 'light',
    hasCompletedOnboarding: false,
    isLoaded: false,


    LoadPreferences: async (db) => {
        if (!db) {
            set({ theme: 'light', hasCompletedOnboarding: false, isLoaded: true });
            return;
        }
        try {
            const saveTheme = await getSettings(db, 'theme', 'light');
            const savedOnborading = await getSettings(db, 'hasCompletedOnboarding', 'false');
            set({
                theme: saveTheme,
                hasCompletedOnboarding: savedOnborading === 'true',
                isLoaded: true
            });
        } catch (e) {
            set({ theme: 'light', hasCompletedOnboarding: false, isLoaded: true });
        }

    },

    changeTheme: async (db, newTheme) => {
        set({
            theme: newTheme
        });
        await setSettings(db, 'theme', newTheme);
    },

    completedOnboarding: async (db) => {
        set({ hasCompletedOnboarding: true });
        await setSettings(db, 'hasCompletedOnboarding', 'true');
    },
    sethasCompletedOnboarding: async (db, value) => {
        set({
            hasCompletedOnboarding: value
        });
        await setSettings(db, 'hasCompletedOnboarding', value);
    }
}))