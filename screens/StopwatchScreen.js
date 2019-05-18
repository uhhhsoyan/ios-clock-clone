import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import RoundButton from '../components/RoundButton'
import moment from 'moment';

function Timer({ interval, style }) {
    const pad = (n) => n < 10 ? '0' + n : n
    const duration = moment.duration(interval)
    const centiseconds = Math.floor(duration.milliseconds() / 10)
    return (
        <View style={styles.timerContainer}>
            <Text style={style}>{pad(duration.minutes())}:</Text>
            <Text style={style}>{pad(duration.seconds())}.</Text>
            <Text style={style}>{pad(centiseconds)}</Text>
        </View>
    )
}

function ButtonsRow({ children }) {
    return (
        <View style={styles.buttonsRow}>{children}</View>
    )
}

function Lap({ number, interval, fastest, slowest }) {
    const lapStyle = [
        styles.lapText,
        fastest && styles.fastest,
        slowest && styles.slowest
    ]
    return (
        <View style={styles.lap}>
            <Text style={lapStyle}>Lap {number}</Text>
            <Timer style={[lapStyle, styles.lapTimer]} interval={interval} />
        </View>
    )
}

function LapTable({ laps, timer }) {
    const finishedLaps = laps.slice(1) // exclude current lap
    let min = Number.MAX_SAFE_INTEGER
    let max = Number.MIN_SAFE_INTEGER
    finishedLaps.forEach(lap => {
        if (lap < min) min = lap
        if (lap > max) max = lap
    })

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

class StopwatchScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            start: 0,
            now: 0,
            laps: []
        }
    }
    static navigationOptions = {
        title: 'Stopwatch',
        headerStyle: {
            backgroundColor: '#181818',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    start = () => {
        const now = new Date().getTime()
        this.setState({
            start: now,
            now,
            laps: [0]
        })
        this.timer = setInterval(() => {
            this.setState({ now: new Date().getTime() })
        }, 10)
    }

    lap = () => {
        const timestamp = new Date().getTime()
        const { start, now, laps } = this.state
        const [firstLap, ...other] = laps
        this.setState({
            laps: [0, firstLap + now - start, ...other],
            // don't think we need firstLap ??
            start: timestamp,
            now: timestamp
        })
    }

    stop = () => {
        clearInterval(this.timer)
        const { start, now, laps } = this.state
        const [firstLap, ...other] = laps
        this.setState({
            laps: [firstLap + now - start, ...other],
            start: 0,
            now: 0
        })
    }

    reset = () => {
        this.setState({
            start: 0,
            now: 0,
            laps: []
        })
    }

    resume = () => {
        const now = new Date().getTime()
        this.setState({
            start: now,
            now,
        })
        this.timer = setInterval(() => {
            this.setState({ now: new Date().getTime() })
        }, 10)
    }

    render() {
        const { now, start, laps } = this.state
        const timer = now - start
        return (
            <View style={styles.container}>
                <Timer
                    interval={laps.reduce((acc, curr) => acc + curr, 0) + timer}
                    style={styles.timer}
                />
                {laps.length === 0 && (
                    <ButtonsRow>
                        <RoundButton
                            title='Reset'
                            color='#FFFFFF'
                            background='#3D3D3D'
                            onPress={this.reset}
                        />
                        <RoundButton
                            title='Start'
                            color='#50D167'
                            background='#1B361F'
                            onPress={this.start}
                        />
                    </ButtonsRow>
                )}

                {start > 0 && (
                    <ButtonsRow>
                        <RoundButton
                            title='Lap'
                            color='#FFFFFF'
                            background='#3D3D3D'
                            onPress={this.lap}
                        />
                        <RoundButton
                            title='Stop'
                            color='#E33935'
                            background='#3C1715'
                            onPress={this.stop}
                        />
                    </ButtonsRow>
                )}

                {laps.length > 0 && start === 0 && (
                    <ButtonsRow>
                        <RoundButton
                            title='Reset'
                            color='#FFFFFF'
                            background='#3D3D3D'
                            onPress={this.reset}
                        />
                        <RoundButton
                            title='Start'
                            color='#50D167'
                            background='#1B361F'
                            onPress={this.resume}
                        />
                    </ButtonsRow>
                )}

                <LapTable laps={laps} timer={timer} />
            </View>
        );
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
    timer: {
        color: '#FFFFFF',
        fontSize: 76,
        fontWeight: '200',
        width: 110 // we used this to fix the position of each piece
    },
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
    buttonsRow: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        marginTop: 80,
        marginBottom: 30,
    },
    lap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#151515',
        borderTopWidth: 1,
        paddingVertical: 10,
    },
    lapText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    lapTimer: {
        width: 30
    },
    scrollView: {
        alignSelf: 'stretch',
    },
    fastest: {
        color: '#4BC054'
    },
    slowest: {
        color: '#CC3531'
    },
    timerContainer: {
        flexDirection: 'row'
    }
})

export default StopwatchScreen