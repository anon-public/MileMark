import { useSearch, SearchBar } from '../../components/ui/SearchBar';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { useTheme } from '../../theme/ThemeProvider';
import { FlatList, View, Text, Pressable } from 'react-native';
import { TopBar } from '../../components/ui/TopBar';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

//DataBase
import { useSQLiteContext } from "expo-sqlite";
import { useTaskStore } from '../../store/useTaskStore';



const SCREEN = 'task';

export default function TaskList({ navigation }) {


    const db = useSQLiteContext();
    const { task, loadTask, addTask, deleteTask, toggleTask } = useTaskStore();

    const { theme } = useTheme();

    const [isSelection, setisSelection] = useState(false);
    const [selectedID, setselectedID] = useState([]);
    const handleLongPress = (id) => {
        setisSelection(true);
        setselectedID([id]);
    }


    const handlePress = (id, item) => {
        if (isSelection) {

            if (selectedID.includes(id)) {
                const newSelection = selectedID.filter(item => item !== id);
                setselectedID(newSelection);
                if (newSelection.length === 0) {
                    setisSelection(false);
                }
            } else {
                setselectedID([...selectedID, id]);
            }
        } else {
            navigation.navigate('TaskDetails', { task: item })
        }

    }

    const handleDelete = async () => {
        await Promise.all(selectedID.map(id => deleteTask(db, id)));
        setselectedID([]);
        setisSelection(false);
    }

    const allTasks = task;
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            loadTask(db);
        }
    }, [isFocused]);


    const { query, setQuery, filtered } = useSearch(allTasks, ['title', 'description']);

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>

            <TopBar />
            {isSelection && (

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 12, margin: 10 }}>
                    <Pressable onPress={() => { setselectedID([]); setisSelection(false); }}>
                        <Text style={{ color: theme.text, fontSize: 22, marginLeft: 22, fontWeight: '600' }}>X</Text>
                    </Pressable>

                    <Pressable onPress={() => handleDelete()}>
                        <Text style={{ fontSize: 18, color: 'red', marginRight: 22, alignSelf: 'flex-end' }}>Delete ({selectedID.length})</Text>
                    </Pressable>
                </View>

            )}

            <Text className='text-4xl font-bold mb-2 px-4' style={{ color: theme.text }}>Tasks</Text>
            <View style={{ height: 1, backgroundColor: '#cccccc', marginVertical: 10 }} />
            <SearchBar value={query} onChangeText={setQuery} onAdd={() => addTask(db, 'New Task', '')} />


            {(allTasks.length === 0) ? <EmptyState /> : <FlatList
                data={filtered}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <Card
                        variant={SCREEN}
                        title={item.title}
                        tag={item.tag === 1 ? 'Completed' : 'Pending'}
                        isSelected={selectedID.includes(item.id)}
                        onPress={() => handlePress(item.id, item)}
                        onLongPress={() => handleLongPress(item.id)}
                        onToggle={() => toggleTask(db, item.id, item.tag)}
                    />
                )}
            />}
        </View>
    );
}
