import { useEffect, useRef } from 'react';
import { View, Animated, Image, Text, StyleSheet } from 'react-native';
import Group1 from '../../assets/icons/Group1.png';
import { useTheme } from '../../theme/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../../store/useThemeStore';

export default function OnboardingOne() {

    const { hasCompletedOnboarding } = useThemeStore();
    const navigation = useNavigation();



    const logoY = useRef(new Animated.Value(300)).current;

    const leftColumnHeight = useRef(new Animated.Value(0)).current;
    const rightColumnHeight = useRef(new Animated.Value(0)).current;

    const opacity = useRef(new Animated.Value(0)).current;
    useEffect(() => {

        Animated.parallel([

            Animated.timing(logoY, {
                toValue: 0,
                duration: 700,
                useNativeDriver: false,
            }),

            Animated.timing(opacity, {
                toValue: 1,
                duration: 700,
                useNativeDriver: false,
            }),

            Animated.timing(leftColumnHeight, {
                toValue: 800,
                duration: 700,
                useNativeDriver: false,
            }),

            Animated.timing(rightColumnHeight, {
                toValue: 800,
                duration: 700,
                useNativeDriver: false,
            }),

        ]).start();

        const timer = setTimeout(() => {
            if (hasCompletedOnboarding) {
                navigation.replace('BottomTabs');
            } else {
                navigation.replace('OnboardingTwo');
            }
        }, 2000);
        return () => clearTimeout(timer);

    }, []);
    const { theme } = useTheme();
    return (
        <View style={styles.background}>

            <Animated.View
                style={[
                    styles.leftColumn,
                    {
                        height: leftColumnHeight,
                    },
                ]}
            />

            <Animated.View
                style={[
                    styles.rightColumn,
                    {
                        height: rightColumnHeight,
                    },
                ]}
            />
            <Animated.Image
                // style={{ transform: [{ translateY }], opacity }}
                source={Group1}
                style={[
                    styles.logo,
                    {
                        opacity,
                        transform: [
                            {
                                translateY: logoY,
                            },
                        ],
                    },
                ]}
            />



        </View>


    )
};

const styles = StyleSheet.create({

    background: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignItems: "flex-end",
    },

    leftColumn: {
        width: 60,
        backgroundColor: "#E18B43",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },

    rightColumn: {
        width: 60,
        backgroundColor: "#E18B43",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginLeft: '60%'

    },

    logo: {
        width: 180,
        height: 180,
        top: '40%',
        position: "absolute",
    },

});