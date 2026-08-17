
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotesList from '../screens/notes/NotesList';
import TaskList from '../screens/task/TaskList';
import { BottomNav } from '../components/ui/BottomNav';


const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (

        <Tab.Navigator
            screenOptions={{
                headerShown: false,

            }}
            tabBar={(props) => <BottomNav {...props} />}
        >
            <Tab.Screen name="Notes" component={NotesList} />
            <Tab.Screen name="Task" component={TaskList} />
        </Tab.Navigator>

    );
}
