import React, { useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeProvider';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './BottomTabs';
import NotesDetails from '../screens/notes/NotesDetails';
import TaskDetails from '../screens/task/TaskDetails';
import SettingsScreen from '../screens/settings/SettingsScreen';
import OnboardingOne from '../screens/Onboarding/OnboardingOne';
import OnboardingTwo from '../screens/Onboarding/OnboardingTwo';
import { useThemeStore } from '../store/useThemeStore';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const db = useSQLiteContext();
    const { isLoaded, LoadPreferences } = useThemeStore();

    useEffect(() => {
        LoadPreferences(db);
    }, []);
    if (!isLoaded) {
        return null;
    }

    return (

        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='OnboardingOne' component={OnboardingOne} />
                <Stack.Screen name='OnboardingTwo' component={OnboardingTwo} />
                <Stack.Screen name='BottomTabs' component={BottomTabs} />
                <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
                <Stack.Screen name='NotesDetails' component={NotesDetails} />
                <Stack.Screen name='TaskDetails' component={TaskDetails} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}