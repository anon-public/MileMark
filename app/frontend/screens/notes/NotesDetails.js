import { useState } from 'react';
import {
    View, TextInput, Text, Pressable,
    KeyboardAvoidingView, Platform, Alert, ScrollView
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { ThreeDotMenu } from '../../components/modals/ThreeDotMenu';
import { FormatStandardDate } from '../../utils/dataFormat';
import { useNotesStore } from '../../store/useNotesStore';
import { useSQLiteContext } from 'expo-sqlite';
import { triggerToast } from '../../components/ui/Toast';

export default function NotesDetails({ route, navigation }) {
    const { theme } = useTheme();
    const { note } = route?.params || {};

    const db = useSQLiteContext();
    const { updateNotes, addNotes, deletenotes } = useNotesStore();


    const [title, setTitle] = useState(note?.title || '');
    const [body, setBody] = useState(note?.content || '');

    const handleSave = async () => {
        if (title.trim() === '') {
            return triggerToast('Please enter a title before saving.');

        }
        if (note?.id) {
            await updateNotes(db, note.id, title, body);
        } else {
            await addNotes(db, title, body);
        }
        return triggerToast('Saved Successfully!')

    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>

            <ThreeDotMenu state={() => { deletenotes(db, note?.id); navigation.goBack(); }} />
            <Text style={{ color: theme.text + '99', fontSize: 12, marginLeft: 16 }}>
                {FormatStandardDate(note?.createdAt)}
            </Text>
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: theme.backgroundColor }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    marginTop: 4,
                    marginHorizontal: 8,
                }}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Text style={{ color: theme.header, fontSize: 20 }}>Back </Text>
                    </Pressable>
                    <Pressable onPress={handleSave}>
                        <Text style={{ color: theme.header, fontSize: 20, fontWeight: 'bold' }}>Save</Text>
                    </Pressable>
                </View>

                <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
                    <View style={{ flex: 1, paddingHorizontal: 16, marginHorizontal: 8, marginTop: 12 }}>

                        <TextInput
                            style={{ fontSize: 28, fontWeight: 'bold', color: theme.text, marginBottom: 4 }}
                            placeholder="Note Title"
                            placeholderTextColor="gray"
                            value={title}
                            onChangeText={setTitle}
                        />


                        <TextInput
                            style={{ flex: 1, fontSize: 16, color: theme.text, marginTop: 12, minHeight: Platform.OS === 'ios' ? 800 : 600 }}
                            placeholder="Start typing..."
                            placeholderTextColor="gray"
                            multiline
                            textAlignVertical="top"
                            value={body}
                            onChangeText={setBody}
                            scrollEnabled={false}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}