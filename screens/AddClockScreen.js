import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import moment from 'moment';

class AddClockScreen extends Component {
    static navigationOptions = {
        title: 'AddClockScreen',
        headerStyle: {
            backgroundColor: '#181818',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    BedtimeScreen
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        alignItems: 'center',
        paddingTop: 130,
        paddingHorizontal: 20,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 38,
        fontWeight: '100',
    },
})

export default AddClockScreen
