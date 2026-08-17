import { useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import * as Notifications from 'expo-notifications';

// This forces the banner to appear even if the app is currently open
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function NotificationSetup() {
    useEffect(() => {
        // Step 2: Request permission when the screen loads
        const requestPermission = async () => {
            await Notifications.requestPermissionsAsync();
        };

        requestPermission();
    }, []);

    const triggerMyNotification = async () => {
        // Step 3: Schedule the local alert
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "MileMark",
                body: "Mark Your Journey Now!",
            },
            trigger: {
                seconds: 5,
            },
        });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Test Notification" onPress={triggerMyNotification} />
        </View>
    );
}