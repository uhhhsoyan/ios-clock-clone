import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function RoundButton({ title, color, background, onPress, disabled }) {
    return (
        <TouchableOpacity
            onPress={() => !disabled && onPress()}
            style={[styles.button, { backgroundColor: background }]}
            activeOpacity={disabled ? 1.0 : 0.7}
        >
            <View style={styles.buttonBorder}>
                <Text style={[styles.buttonTitle, { color }]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = {
    button: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        fontSize: 18,
    },
    buttonBorder: {
        width: 76,
        height: 76,
        borderRadius: 38,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
}

export default RoundButton