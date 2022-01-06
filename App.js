import { NavigationContainer } from "@react-navigation/native";
import React from "react";


import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./App/Screens/Home";
import Stats from "./App/Screens/Stats";
import Settings from "./App/Screens/Settings";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTint, faSignal, faCog } from "@fortawesome/free-solid-svg-icons";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator      >
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