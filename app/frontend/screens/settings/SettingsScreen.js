import { useEffect } from "react";
import { View, Text, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { useThemeStore } from "../../store/useThemeStore";
import { useSQLiteContext } from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { triggerToast } from '../../components/ui/Toast';

export default function SettingsScreen() {

    const { theme: currentTheme, changeTheme, LoadPreferences } = useThemeStore();
    const db = useSQLiteContext();
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            LoadPreferences(db);
        }
    }, [isFocused]);

    const HandleSave = () => {
        return triggerToast('Saved Successfully!');
    };

    const themeOptions = [
        { label: 'Light Theme', value: 'light' },
        { label: 'Dark Theme', value: 'dark' },
        { label: 'Study Theme', value: 'study' },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>

            <View style={{ flex: 1, marginTop: 16, paddingHorizontal: 12 }}>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    marginHorizontal: 8,
                    marginTop: insets.top + 8
                }}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Text style={{ color: theme.header, fontSize: 20 }}>Back </Text>
                    </Pressable>
                    <Pressable onPress={HandleSave} >
                        <Text style={{ color: theme.header, fontSize: 20, fontWeight: 'bold' }}>Save</Text>
                    </Pressable>
                </View>

                <Text style={{ color: theme.text, fontSize: 32, fontWeight: 'bold', marginBottom: 8, paddingHorizontal: 16, marginTop: 12 }}>Settings</Text>
                <View style={{ height: 1, backgroundColor: '#cccccc', marginVertical: 10 }} />

                <Text style={{ color: theme.text, fontSize: 20, fontWeight: '500', paddingHorizontal: 16, marginVertical: 8 }}>Theme Selection</Text>

                {themeOptions.map((opt) => {
                    const isSelected = currentTheme === opt.value;
                    return (
                        <Pressable
                            key={opt.value}
                            onPress={() => changeTheme(db, opt.value)}
                            style={{
                                paddingVertical: 14,
                                paddingHorizontal: 16,
                                marginHorizontal: 12,
                                marginVertical: 6,
                                borderRadius: 12,
                                borderBottomWidth: 1,
                                borderColor: '#b9b9b985',
                                backgroundColor: isSelected ? theme.header + '30' : 'transparent',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ color: theme.text, fontSize: 18, fontWeight: '400' }}>{opt.label}</Text>
                            {isSelected && <Text style={{ color: theme.header, fontSize: 18, fontWeight: 'bold' }}>✓</Text>}
                        </Pressable>
                    );
                })}

            </View>

        </SafeAreaView>
    );
}