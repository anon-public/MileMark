import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import AntDesign from '@expo/vector-icons/AntDesign';

export const EmptyState = () => {
    const { theme } = useTheme();

    return (

        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={styles.subcontainer}>
                <View style={styles.icon}>
                    <View style={{ alignItems: 'center', marginBottom: 6 }}>
                        <AntDesign name="file-add" size={24} color={theme.header} />
                        <Text style={[styles.iconText, { color: theme.header }]}>No MileStones yet!</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subcontainer: {

        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 16,
        fontWeight: '500'
    },
    icon: {
        backgroundColor: '#e18a431c',
        borderRadius: 25,
        padding: 22,
        margin: 12
    }
})