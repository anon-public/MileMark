import { create } from 'zustand';
import { getAllTask, inserttask, deletetask, toogleTaskTag, updatetask, getTaskByID, setTaskTag } from '../database/DB';
import * as Notifications from 'expo-notifications';

export const useTaskStore = create((set) => ({
    task: [],

    loadTask: async (db) => {
        const data = await getAllTask(db);
        set({ task: data });
    },

    addTask: async (db, title, content) => {
        let alertId = '';
        const { status } = await Notifications.getPermissionsAsync();
        if (status === 'granted') {
            alertId = await Notifications.scheduleNotificationAsync({
                content: { title: "Task Reminder", body: `Review "${title}"` },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                    seconds: 28800,
                    repeats: false,
                    channelId: 'default',
                },
            });
        }
        await inserttask(db, title, content, alertId);
        const data = await getAllTask(db);
        set({ task: data });
    },

    deleteTask: async (db, id) => {

        const taskToDelete = await getTaskByID(db, id);

        if (taskToDelete && taskToDelete.notificationID) {

            try {

                await Notifications.cancelScheduledNotificationAsync(taskToDelete.notificationID);
            } catch (e) {

            }
        }

        await deletetask(db, id);
        const data = await getAllTask(db);
        set({ task: data });
    },
    toggleTask: async (db, id, currentStatus) => {
        await toogleTaskTag(db, id, currentStatus);
        const data = await getAllTask(db);
        set({ task: data });
    },

    updateTask: async (db, id, title, content) => {
        await updatetask(db, id, title, content);
        const data = await getAllTask(db);
        set({ task: data });
    },
    setTag: async (db, id, value) => {
        await setTaskTag(db, id, value);
        const data = await getAllTask(db);
        set({ task: data });
    }

}));