import { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import Group1 from '../../assets/icons/Group1.png';
import Group2 from '../../assets/icons/Group2.png';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../../store/useThemeStore';
import { useSQLiteContext } from 'expo-sqlite';
import * as Notifications from 'expo-notifications';

export default function OnboardingTwo() {

    const db = useSQLiteContext()
    const { changeTheme, completedOnboarding } = useThemeStore();


    const images = [Group1, Group2];
    const navigation = useNavigation();
    const { theme } = useTheme();
    const [currentImage, setcurrentImage] = useState(0);
    const [select, setselect] = useState('light');

    const rotate = useRef(new Animated.Value(0)).current;
    const rotateY = rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });

    const flipImage = (Group2) => {
        Animated.timing(rotate, {
            toValue: 1,
            duration: 600,
            useNativeDriver: false,
        }).start(() => {
            setcurrentImage(Group2);

            rotate.setValue(0);
        });
    };

    return (
        <View className='flex-1 items-center justify-center ' style={{ backgroundColor: theme.backgroundColor }}>
            <Animated.Image
                source={images[currentImage]}
                style={{ width: 160, height: 160, borderRadius: 25, borderColor: theme.header, borderWidth: 1, transform: [{ rotateY }] }} />
            <Text style={{ color: theme.text, fontSize: 24, margin: 28 }}> Choose your Theme  </Text>
            <View className='flex-2 flex-row justify-start py-3'>
                <Pressable
                    onPress={() => {
                        flipImage(0)
                        changeTheme(db, 'light');
                        setselect('light')
                    }}
                    style={{
                        marginRight: 16,
                        paddingHorizontal: 20,
                        paddingVertical: 12,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: theme.text,
                        backgroundColor: select === 'light' ? theme.header + '60' : 'transparent',
                    }}
                >
                    <Text style={{ color: theme.mainText, fontSize: 16, fontWeight: '400' }}>Light Theme</Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        flipImage(1)
                        changeTheme(db, 'dark');
                        setselect('dark');
                    }}
                    style={{
                        backgroundColor: select === 'dark' ? theme.header + '60' : 'transparent',
                        paddingHorizontal: 20,
                        paddingVertical: 12,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: theme.text,
                        alignItems: 'center'
                    }}
                ><Text style={{ color: theme.mainText, fontSize: 16, fontWeight: '400' }}>Dark Theme</Text>
                </Pressable>


            </View>
            <Pressable
                onPress={async () => {
                    await completedOnboarding(db)
                    try {
                        await Notifications.requestPermissionsAsync();
                    } catch (e) {

                    }
                    navigation.replace('BottomTabs');
                }}
                style={{
                    margin: 12,
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: theme.mainText,
                    alignItems: 'center'
                }}
            >
                <Text style={{ color: theme.mainText, fontSize: 16, fontWeight: '600' }}>Get Started</Text>
            </Pressable>
        </View>
    )
}