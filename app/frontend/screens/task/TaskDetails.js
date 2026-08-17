import React, { useState } from 'react';
import {
    Text, View, TextInput, KeyboardAvoidingView,
    Pressable, FlatList, Platform, ScrollView
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { ThreeDotMenu } from '../../components/modals/ThreeDotMenu';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Checkbox } from 'expo-checkbox';
import { FormatStandardDate } from '../../utils/dataFormat';

import { useTaskStore } from '../../store/useTaskStore';
import { useSQLiteContext } from 'expo-sqlite';
import { triggerToast } from '../../components/ui/Toast';

export default function TaskDetails({ route, navigation }) {
    const { theme } = useTheme();
    const { task } = route?.params || {};

    //DataBase
    const db = useSQLiteContext();
    const { updateTask, addTask, deleteTask, setTag } = useTaskStore();

    const handleSave = async () => {
        if (title.trim() === '') {
            return triggerToast('Please enter a title before saving.');

        }

        const isCompleted = totalTasks > 0 && completedTasks === totalTasks;
        const payload = JSON.stringify({ description: content, subTasks });
        if (task?.id) {
            await updateTask(db, task.id, title, payload);
            setTag(db, task.id, isCompleted ? 1 : 0);
        }
        else { await addTask(db, title, payload); }
        return triggerToast('Saved Successfully!');
    };


    const parsed = (() => {
        try { return JSON.parse(task?.content || '{}'); } catch { return {}; }
    })();

    const [title, setTitle] = useState(task?.title || '');
    const [content, setcontent] = useState(parsed.description || '');
    const [inputText, setInputText] = useState('');
    const [subTasks, setSubTasks] = useState(parsed.subTasks || []);

    const completedTasks = subTasks.filter(t => t.checked).length;
    const totalTasks = subTasks.length;



    const handleAddSubTask = () => {
        const trimmed = inputText.trim();
        if (!trimmed) return;
        setSubTasks(prev => [...prev, { id: Date.now().toString(), text: trimmed, checked: false }]);
        setInputText('');
    };

    const toggleCheck = (id) => {
        setSubTasks(prev =>
            prev.map(t => t.id === id ? { ...t, checked: !t.checked } : t)
        );
    };

    const renderSubTask = ({ item }) => (
        <Pressable
            onPress={() => toggleCheck(item.id)}
            style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 16 }}
        >
            <Checkbox
                value={item.checked}
                color={item.checked ? theme.header : undefined}
                style={{ marginRight: 12, borderRadius: 4, pointerEvents: 'none' }}
            />
            <Text style={{
                fontSize: 16,
                color: theme.text,
                textDecorationLine: item.checked ? 'line-through' : 'none',
                opacity: item.checked ? 0.5 : 1,
                flex: 1,
            }}>
                {item.text}
            </Text>
        </Pressable>
    );

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>

            <ThreeDotMenu state={() => { deleteTask(db, task?.id); navigation.goBack(); }} />
            <Text style={{ color: theme.text + '99', fontSize: 12, marginLeft: 16 }}>
                {FormatStandardDate(task?.createdAt)}
            </Text>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 12,
                marginTop: 4,
                marginHorizontal: 8,
            }}>
                <Pressable onPress={() => navigation.goBack()} style={{ paddingHorizontal: 12 }}>
                    <Text style={{ color: theme.header, fontSize: 20 }}> Back </Text>
                </Pressable>
                <Pressable onPress={handleSave} style={{ paddingHorizontal: 12 }}>
                    <Text style={{ color: theme.header, fontSize: 20, fontWeight: 'bold' }}> Save </Text>
                </Pressable>
            </View>

            <View style={{ paddingHorizontal: 16, marginHorizontal: 8, marginTop: 4 }}>
                <ProgressBar completedTasks={completedTasks} totalTasks={totalTasks} />
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">

                    <View style={{ paddingHorizontal: 16, marginHorizontal: 8, marginTop: 12 }}>
                        <TextInput
                            style={{ fontSize: 28, fontWeight: 'bold', color: theme.text, marginBottom: 4 }}
                            placeholder="MileMark Title"
                            placeholderTextColor="gray"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>


                    <View style={{ marginTop: 8 }}>
                        {subTasks.map(item => (
                            <React.Fragment key={item.id}>
                                {renderSubTask({ item })}
                            </React.Fragment>
                        ))}
                    </View>
                    <View style={{ paddingHorizontal: 16, marginHorizontal: 8, marginTop: 8, marginBottom: 24 }}>
                        <TextInput
                            style={{
                                fontSize: 16, color: theme.text, paddingVertical: 12,
                                borderBottomWidth: 1, borderBottomColor: '#9ca3af'
                            }}
                            placeholder="Add a task and press Enter..."
                            placeholderTextColor="gray"
                            value={inputText}
                            onChangeText={setInputText}
                            onSubmitEditing={handleAddSubTask}
                            submitBehavior="blurAndSubmit"
                            returnKeyType="done"
                        />
                    </View>


                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}