import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button
} from 'react-native';
var moment = require('moment-timezone');

const DATA = {
    city: "San Francisco",
    relativeHours: 2,
}

function ClockTable({  }) {
    
    return (
        <ScrollView style={styles.scrollView}>
            {laps.map((lap, index) => (
                <Lap
                    number={laps.length - index}
                    key={laps.length - index}
                    interval={index === 0 ? timer + lap : lap}
                    slowest={lap === max}
                    fastest={lap === min}
                />
            ))}
        </ScrollView>
    )
}

function Clock({ localDate }) {
    let hours , ampm
    if (localDate.getHours() === 0) {
        hours = 12
        ampm = "AM"
    } else if (localDate.getHours() < 13) {
        hours = localDate.getHours()
        ampm = "AM"
    } else {
        hours = localDate.getHours() % 12
        ampm = "PM"
    }
    const pad = (n) => n < 10 ? '0' + n : n
    return (
        <View style={styles.clockRow}>
            <View>
                <Text style={styles.relTimeText}>{`Today, +${DATA.relativeHours}HRS`}</Text>
                <Text style={styles.cityText}>{DATA.city}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={styles.clockText}>{hours}</Text>
                <Text style={styles.clockText}>:</Text>
                <Text style={styles.clockText}>{pad(localDate.getMinutes())}</Text>
                <Text style={styles.clockAMPM}>{ampm}</Text>
            </View>
        </View>
    )
}

class WorldClockScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            localDate: new Date(),
            //localTimeZone: moment.tz 
        }
    }  
    componentDidMount() {
        setInterval(() => {
            this.setState({ localDate: new Date() })
        }, 1000)
    }
    
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'World Clock',
            headerStyle: {
                backgroundColor: '#181818',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerRight: (
                <Button
                    onPress={() => navigation.navigate('WorldClockAdd')}
                    title="+"
                    color='#FF9500'
                />
            ),
            headerLeft: (
                <Button 
                    onPress={() => alert("This button is not hooked up!")}
                    title="Edit"
                    color='#FF9500'
                />
            )
        }
    };
    render() {
        const { localDate } = this.state
        //console.log(moment.tz.names())
        return (
            <View style={styles.container}>
                <Clock localDate={localDate}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    relTimeText: {
        color: '#7F7F7F',
        fontSize: 14,
        fontWeight: '200'
    },
    cityText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '300',
    },
    clockText: {
        color: '#FFFFFF',
        fontSize: 56,
        fontWeight: '200',
    },
    clockAMPM: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '300', 
    },
    clockRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        alignItems: 'center',
        borderColor: '#151515',
        borderBottomWidth: 1,
    }
})

export default WorldClockScreen