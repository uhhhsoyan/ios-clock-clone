import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
var moment = require('moment-timezone');

const timezones = moment.tz.names();
//console.log(moment.tz("America/Los_Angeles").format())
//console.log(moment.tz.zone('America/Los_Angeles').untils)

function ClockLookupTable({ timezones }) {
    return (
        <ScrollView style={styles.scrollView}>
            {timezones.map((tz, index) => {
                return (
                    <ClockLookupRow 
                        cityName={tz.split('/').reverse().join(', ')}
                        lookupID={tz}
                        key={index}
                    />
                )
            })}
        </ScrollView>
    )
}

function ClockLookupRow({ cityName, lookupID }) {
    return (
        <TouchableOpacity onPress={() =>
            console.log(moment.tz(`${lookupID}`).format('Z'))
        }>
            <View style={styles.clockLookupRow}>
                <Text style={styles.clockLookupText}>{cityName}</Text>
            </View>
        </TouchableOpacity>
    )
}


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
                <ClockLookupTable timezones={timezones} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 38,
        fontWeight: '100',
    },
    scrollView: {
        alignSelf: 'stretch',
    },
    clockLookupRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#151515',
        borderTopWidth: 1,
        paddingVertical: 10,
    },
    clockLookupText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
})

export default AddClockScreen
