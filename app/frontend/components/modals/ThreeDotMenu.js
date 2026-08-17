import React, { useState } from 'react';
import { Text, Pressable, View, Modal } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useTheme } from '../../theme/ThemeProvider';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function ThreeDotMenu({ state }) {
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();
    const [visible, setVisible] = useState(false);

    return (
        <View className='flex-row justify-end px-8 py-2' style={{ paddingTop: insets.top + 12 }}>
            <Pressable onPress={() => setVisible(true)}>
                <Entypo name="dots-three-vertical" size={22} color={theme.text} />
            </Pressable>

            <Modal
                transparent
                visible={visible}
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }} onPress={() => setVisible(false)}>
                    <View style={{
                        position: 'absolute',
                        top: insets.top + 45,
                        right: 24,
                        backgroundColor: theme.backgroundColor,
                        borderRadius: 12,
                        padding: 8,
                        width: 140,
                        borderWidth: 1,
                        borderColor: theme.text + '60'

                    }}>
                        <Pressable
                            onPress={() => {
                                setVisible(false);
                                if (typeof state === 'function') state();
                            }}
                            style={{ padding: 10 }}
                        >
                            <Text style={{ color: 'red', fontSize: 16, fontWeight: '500' }}>Delete</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}