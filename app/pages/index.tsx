import React, {useRef} from 'react';
import {NavigationContainer, NavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './Home';
import SettingsScreen from './Settings';
import TickersSelector from './Playlist';
import AddNewTicker from './ImportTicker';

// @ts-ignore
/*import Storybook from './Storybook';*/
import {Routes} from '../config/routes';
import TickersNavbarRight from './Playlist/TickersNavbar/TickersNavbarRight';
import TickersNavbarLeft from './Playlist/TickersNavbar/TickersNavbarLeft';
import AppNavBar from '../components/AppNavBar';
import {RobotoRegular} from '../config/fonts';
import SettingsNavbarLeft from './Settings/SettingsNavbarLeft';
import SettingsNavbarRight from './Settings/SettingsNavbarRight';
import HelpScreen from './Help';
import HelpNavbarLeft from './Help/HelpComponents/HelpNavbarLeft';
import ImportTickerNavbarLeft from './ImportTicker/ImportTickerNavbarLeft';
import HelpNavbarRight from './Help/HelpComponents/HelpNavbarRight';
import appScale from '../utils/appScale';
import BoardNew from './Board/Board';
import logScreenView from '../utils/analytics/logScreenView';

const Stack = createStackNavigator();

const screenOptions = {
  animationEnabled: true,
  headerStyle: {
    // backgroundColor: '#002923',
    backgroundColor: 'transparent',
    height: appScale(40),
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS
    borderBottomWidth: appScale(1),
    borderBottomColor: '#004e22',
  },
  headerTintColor: '#ffffff',
  headerTitleStyle: {
    fontSize: appScale(18),
    fontFamily: RobotoRegular,
    fontWeight: 'normal',
  },
  header: AppNavBar,
};

export default function AppPages() {
  const navigationRef = useRef<NavigationContainerRef>(null);
  const routeNameRef = useRef<string>();

  const onNavigationReady = () => {
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
    logScreenView(Routes.HOME);
  };

  const onNavigationStateChange = async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (currentRouteName && previousRouteName !== currentRouteName) {
      await logScreenView(currentRouteName);
    }

    routeNameRef.current = currentRouteName;
  };

  return (
    <NavigationContainer ref={navigationRef} onReady={onNavigationReady} onStateChange={onNavigationStateChange}>
      <Stack.Navigator initialRouteName={Routes.HOME} screenOptions={screenOptions} headerMode="screen">
        <Stack.Screen name={Routes.HOME} component={Home} options={{headerShown: false}} />
        <Stack.Screen
          name={Routes.BOARD}
          component={BoardNew}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name={Routes.SETTINGS}
          component={SettingsScreen}
          options={{
            headerShown: true,
            headerLeft: () => <SettingsNavbarLeft />,
            headerRight: () => <SettingsNavbarRight />,
            title: '',
          }}
        />
        <Stack.Screen
          name={Routes.PLAYLIST}
          component={TickersSelector}
          options={() => ({
            headerShown: true,
            title: '',
            headerLeft: () => <TickersNavbarLeft />,
            headerRight: () => <TickersNavbarRight />,
          })}
        />
        <Stack.Screen
          name={Routes.ADD_NEW_TICKER}
          component={AddNewTicker}
          options={{
            headerShown: true,
            title: '',
            headerLeft: () => <ImportTickerNavbarLeft />,
          }}
        />
        {/*<Stack.Screen
          name={Routes.STORYBOOK}
          component={Storybook}
          options={{
            headerShown: true,
            title: 'Storybook',
          }}
        />*/}
        <Stack.Screen
          name={Routes.HELP}
          component={HelpScreen}
          options={{
            headerLeft: () => <HelpNavbarLeft />,
            headerRight: () => <HelpNavbarRight />,
            headerShown: true,
            title: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
