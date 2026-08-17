import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

const TAG_COLORS = {
    Completed: '#a3c1ad96',
    Pending: '#e2deda80',
    Ongoing: '#E1C743',
};

export function Card({ title, description, tag, variant = 'note', onPress, onLongPress, isSelected, onToggle }) {
    const { theme } = useTheme();

    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.card, { backgroundColor: isSelected ? theme.header + '40' : theme.cardBg ?? '#EDEAE3' }]}
        >
            <View style={styles.row}>
                <Text numberOfLines={1} ellipsizeMode='clip' style={[styles.title, { color: theme.text, width: 190 }]}>{title}</Text>
                {variant === 'task' && tag && (
                    <View style={{ alignSelf: 'flex-end' }}>
                        <View style={[styles.tag, { backgroundColor: TAG_COLORS[tag] ?? '#ccc' }]}>
                            <Text style={styles.tagText}> {tag} </Text>
                        </View>
                    </View>
                )}
            </View>
            {description && (
                <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.desc, { color: theme.text + '99' }]}>{description}</Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: { flex: 2, borderRadius: 10, padding: 14, marginVertical: 6, marginHorizontal: 12, paddingVertical: 28 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    title: { fontSize: 15, fontWeight: '600', },
    desc: { fontSize: 13, marginTop: 4 },
    tag: { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 3, alignSelf: 'flex-end' },
    tagText: { fontSize: 11, color: '#414A45' },
});
