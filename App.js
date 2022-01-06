import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";

import { Appearance, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./App/Screens/Home";
import Stats from "./App/Screens/Stats";
import Settings from "./App/Screens/Settings";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTint, faSignal, faCog } from "@fortawesome/free-solid-svg-icons";

const Tab = createBottomTabNavigator();

const App = () => {

  const styles = StyleSheet.create({
    light: {
      backgroundColor: 'white',
      color: 'black'
    },

    dark: {
      backgroundColor: 'black',
      color: 'white'
    },

  })

  const [style, setStyle] = useState(Appearance.getColorScheme() === 'light' ? styles.light : styles.dark)

  Appearance.addChangeListener(() => {
    setStyle(Appearance.getColorScheme() === 'light' ? styles.light : styles.dark)
  })

  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{
          tabBarStyle: style,
          headerStyle: style,
          headerTitleStyle: style,
          
        }}
      >
        <Tab.Screen name="Home" component={Home} options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={ faTint } color={color} size={size} />
          )
        }
        }/>
        <Tab.Screen name="Stats" component={Stats} options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={ faSignal } color={color} size={size} />
          )
        }
        } />
        <Tab.Screen name="Settings" component={Settings} options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={ faCog } color={color} size={size} />
          )
        }
        }/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;