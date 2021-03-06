import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import { StyleSheet, useColorScheme } from "react-native";
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

  const isDarkMode = useColorScheme() === 'dark';
  const [style, setStyle] = useState(isDarkMode ? styles.light : styles.dark)

  useEffect(() => {
    setStyle(isDarkMode ? styles.dark : styles.light)
  }, [isDarkMode])

  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{
          tabBarStyle: style,
          headerShown: false,
          
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