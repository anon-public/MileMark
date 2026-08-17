import React, { useState, useMemo } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export function useSearch(data = [], keys) {
    const [query, setQuery] = useState('');
    const safeData = Array.isArray(data) ? data : [];
    const filtered = useMemo(() => {
        if (!query.trim()) return safeData;
        const q = query.toLowerCase();
        return safeData.filter(item => keys.some(k => item && item[k] ? String(item[k]).toLowerCase().includes(q) : false));
    }, [query, safeData]);
    return { query, setQuery, filtered };
}

export function SearchBar({ value, onChangeText, onAdd }) {
    const { theme } = useTheme();
    return (
        <View style={styles.container}>
            <View style={[styles.wrapper, { borderColor: theme.header + '60' }]}>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder="Search..."
                    placeholderTextColor={theme.text + '80'}
                    style={[styles.input, { color: theme.text }]}
                />
            </View>
            <Pressable
                style={[styles.addButton, { backgroundColor: theme.header + '60' }]}
                onPress={onAdd}
            >
                <Text style={{ color: theme.text, fontSize: 12 }}>+</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center' },
    wrapper: { flex: 6, borderWidth: 1, borderRadius: 10, marginHorizontal: 12, marginVertical: 8, paddingHorizontal: 12 },
    input: { height: 40, fontSize: 14 },
    addButton: { paddingVertical: 12, paddingHorizontal: 30, borderRadius: 20, marginHorizontal: 12, alignItems: 'center', justifyContent: 'center' }
});
