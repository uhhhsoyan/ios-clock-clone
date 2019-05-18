import React, { Component } from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import NavigationService from './navigation/NavigationService';
import { Ionicons } from '@expo/vector-icons'

import WorldClockScreen from './screens/WorldClockScreen';
import AlarmScreen from './screens/AlarmScreen';
import BedtimeScreen from './screens/BedtimeScreen';
import StopwatchScreen from './screens/StopwatchScreen';
import TimerScreen from './screens/TimerScreen';

const WorldClockStack = createStackNavigator({
  WorldClock: WorldClockScreen,
});

const AlarmStack = createStackNavigator({
  Alarm: AlarmScreen,
});

const BedtimeStack = createStackNavigator({
  Stopwatch: BedtimeScreen,
});

const StopwatchStack = createStackNavigator({
  Stopwatch: StopwatchScreen,
});

const TimerStack = createStackNavigator({
  Timer: TimerScreen,
});

const TopLevelNavigator = createBottomTabNavigator(
  {
    worldclock: WorldClockStack,
    alarm: AlarmStack,
    bedtime: BedtimeStack,
    stopwatch: StopwatchStack,
    timer: TimerStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'worldclock') {
          iconName = 'ios-globe';
        } else if (routeName === 'alarm') {
          iconName = 'ios-alarm';
        } else if (routeName === 'bedtime') {
          iconName = 'ios-bed'
        } else if (routeName === 'stopwatch') {
          iconName = 'ios-stopwatch';
        } else if (routeName === 'timer') {
          iconName = 'ios-timer';
        }
        // You can return any component that you like here!
        return <IconComponent name={iconName} size={35} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#FF9500',
      inactiveTintColor: '#7F7F7F',
      style: {
        backgroundColor: '#181818'
      }
    },
    navigationOptions: {
      header: {
        visible: true
      },
      style: {
        backgroundColor: '#181818',
      }
    }
  }
);

const AppContainer = createAppContainer(TopLevelNavigator);

export default class App extends Component {

  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}