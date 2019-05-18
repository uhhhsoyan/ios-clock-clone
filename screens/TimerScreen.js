import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Picker
} from 'react-native';
import RoundButton from '../components/RoundButton'
import moment from 'moment';

function Timer({ duration, style }) {
    const pad = (n) => n < 10 ? '0' + n : n
    
    return (
        <View style={styles.timerContainer}>
            <Text style={style}>{pad(duration.hours())}:</Text>
            <Text style={style}>{pad(duration.minutes())}:</Text>
            <Text style={style}>{pad(duration.seconds())}</Text>
        </View>
    )
}

function ButtonsRow({ children }) {
    return (
        <View style={styles.buttonsRow}>{children}</View>
    )
}

class TimerScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0,
            showPicker: true,
            showTimer: false,
        }
    }
    
    static navigationOptions = {
        title: 'Timer',
        headerStyle: {
            backgroundColor: '#181818',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    start = () => {
        const { hours, minutes, seconds } = this.state;
        this.setState({
            timeLeft: moment.duration({ seconds, minutes, hours }),
            showPicker: false,
            showTimer: true,
            test: 'test'
        })
        //this.test()
        /*
        setInterval(() => {
            this.setState({ timeLeft: timeLeft.subtract(1, 'seconds') })
        }, 1000)
        */   
    }

    test = () => {
        console.log(this.state)
    }

    cancel = () => {
        const { timeLeft } = this.state
        setInterval(() => {
            this.setState({ timeLeft: timeLeft.subtract(1, 'seconds') })
        }, 1000)
    }

    render() {
        const { timeLeft, showPicker, showTimer } = this.state;

        return (
            <View style={styles.container}>
                {showTimer && (
                    <View style={styles.timerContainer}>
                        <Timer
                            duration={timeLeft}
                            style={styles.timer}
                        />
                    </View>
                )}
                {showPicker && (
                    <View>
                        <View style={styles.pickerRow}>
                            <Picker
                                selectedValue={this.state.hours}
                                style={{ height: 50, width: 100 }}
                                itemStyle={styles.pickerText}
                                onValueChange={hours => this.setState({hours})}
                                >
                                {Array.from(Array(24).keys()).map(item => (
                                    <Picker.Item key={item} label={`${item}`} value={item} />
                                ))}
                            </Picker>
                            <Picker
                                selectedValue={this.state.minutes}
                                style={{ height: 50, width: 100 }}
                                itemStyle={styles.pickerText}
                                onValueChange={minutes => this.setState({minutes})}
                            >
                                {Array.from(Array(60).keys()).map(item => (
                                    <Picker.Item key={item} label={`${item}`} value={item} />
                                ))}
                            </Picker>
                            <Picker
                                selectedValue={this.state.seconds}
                                style={{ height: 50, width: 100 }}
                                itemStyle={styles.pickerText}
                                onValueChange={seconds => this.setState({seconds})}
                            >
                                {Array.from(Array(60).keys()).map(item => (
                                    <Picker.Item key={item} label={`${item}`} value={item} />
                                ))}
                            </Picker>
                        </View>
                    
                        <View style={[styles.pickerLabelRow, { paddingLeft: 65 }]}>
                            <Text style={styles.pickerLabelText}>hours</Text>
                        </View>
                        <View style={[styles.pickerLabelRow, { paddingLeft: 165 }]}>
                            <Text style={styles.pickerLabelText}>min</Text>
                        </View>
                        <View style={[styles.pickerLabelRow, { paddingLeft: 265 }]}>
                            <Text style={styles.pickerLabelText}>sec</Text>
                        </View>
                    </View>
                )}
                <ButtonsRow>
                    <RoundButton
                        title='Cancel'
                        color='#FFFFFF'
                        background='#3D3D3D'
                        onPress={this.cancel}
                    />
                    <RoundButton
                        title='Start'
                        color='#50D167'
                        background='#1B361F'
                        onPress={this.start}
                    />
                </ButtonsRow>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    pickerRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    pickerText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '100',
    },
    pickerLabelText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pickerLabelRow: { 
        flexDirection: 'row',
        alignSelf: 'stretch',
        marginTop: 100,
        position: 'absolute'
    },
    timerContainer: {
        flexDirection: 'row'
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
        marginTop: 200,
        marginBottom: 30,
    },
})

export default TimerScreen
