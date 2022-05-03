
import { StyleSheet, Text, View } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from './screens/Login';
import Home from './screens/Home';
import Search from './screens/Search';
import Library from './screens/Library';


const Tab = createMaterialBottomTabNavigator();

// This is used throughout the whole application for the dark theme.
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    background: 'black',
    text: 'white'
  }
}

export default function App() {

  const scheme = useColorScheme();

  return (
    // This whole part is used for the bottom tab navigation
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : MyTheme}>
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="white"
      barStyle={{ backgroundColor: '#4f4f4f' }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={27} />
          ),
        }}
      />
       <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={30} />
          ),
        }}
      />
       <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bookshelf" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="login" color={color} size={27} />
          ),
        }}
      />
      </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
