import { create } from 'zustand';
import { getAllNotes, insertnote, deleteNotes, updatenotes, getNoteByID } from '../database/DB';
import * as Notifications from 'expo-notifications';

export const useNotesStore = create((set) => ({
    notes: [],

    loadNotes: async (db) => {
        const data = await getAllNotes(db);
        set({ notes: data });
    },

    addNotes: async (db, title, content) => {
        let alertId = '';
        const { status } = await Notifications.getPermissionsAsync();
        if (status === 'granted') {
            alertId = await Notifications.scheduleNotificationAsync({
                content: { title: "Note Reminder", body: `Review "${title}"` },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                    seconds: 28800,
                    repeats: false,
                    channelId: 'default',
                },
            });
        }
        await insertnote(db, title, content, alertId);
        const data = await getAllNotes(db);
        set({ notes: data });
    },

    deletenotes: async (db, id) => {
        const noteToDelete = await getNoteByID(db, id);

        if (noteToDelete && noteToDelete.notificationID) {
            try {

                await Notifications.cancelScheduledNotificationAsync(noteToDelete.notificationID);

            } catch (e) {

            }
        }

        await deleteNotes(db, id);
        const data = await getAllNotes(db);
        set({ notes: data });
    },

    updateNotes: async (db, id, title, content) => {
        await updatenotes(db, id, title, content);
        const data = await getAllNotes(db);
        set({ notes: data });
    }

}));