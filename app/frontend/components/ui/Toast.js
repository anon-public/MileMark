import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Animated, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const globalToastReference = React.createRef();

export const triggerToast = (message) => {
    globalToastReference.current?.show(message);
};

export const GlobalToast = forwardRef((props, ref) => {
    const insets = useSafeAreaInsets();
    const [isVisible, setIsVisible] = useState(false);
    const [toastText, setToastText] = useState('');
    const opacity = useRef(new Animated.Value(0)).current;

    useImperativeHandle(ref, () => ({
        show: (text) => {
            setToastText(text);
            setIsVisible(true);

            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();

            setTimeout(() => {
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => {
                    setIsVisible(false);
                });
            }, 2500);
        }
    }));

    if (!isVisible) return null;

    return (
        <Animated.View
            style={{
                position: 'absolute',
                top: insets.top + 16,
                alignSelf: 'center',
                opacity: opacity,
                backgroundColor: '#E18B43',
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 30,
                elevation: 5,
                zIndex: 1000,
            }}
        >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{toastText}</Text>
        </Animated.View>
    );
});