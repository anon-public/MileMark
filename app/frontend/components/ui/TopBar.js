import { View, Text, Pressable, SafeAreaViewBase } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function TopBar() {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    return (

        <View style={{
            flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 20, paddingTop: insets.top + 8
        }}>
            <Pressable onPress={() => navigation.navigate('SettingsScreen')}>
                <Ionicons name="settings" size={22} color={theme.text} />
            </Pressable >
        </View >

    );
}