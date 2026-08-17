import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const BottomNav = ({ state, navigation }) => {

    const { theme } = useTheme();
    const insets = useSafeAreaInsets();

    const tabs = [
        { name: 'Notes', icon: <MaterialIcons name="notes" size={24} /> },
        { name: 'Task', icon: <Octicons name="tasklist" size={24} /> },
    ];

    return (
        <View style={{ backgroundColor: theme.backgroundColor }}>

            <View style={[styles.container, { paddingBottom: insets.bottom, maxHeight: 60 + insets.bottom, backgroundColor: theme.bottomNav }]}>
                {tabs.map((tab, index) => {
                    const isFocused = state.index === index;
                    return (
                        <View key={tab.name} style={styles.subcontainer}>
                            <Pressable onPress={() => navigation.navigate(tab.name)}>
                                {React.cloneElement(tab.icon, {
                                    color: isFocused ? theme.header : theme.text,
                                })}
                                <Text style={[styles.iconText, { color: isFocused ? theme.mainText : theme.text + '99' }]}>
                                    {tab.name}
                                </Text>
                            </Pressable>
                        </View>
                    );
                })}
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    subcontainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    iconText: {
        fontSize: 16,
        fontWeight: '500'
    }
});