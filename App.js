import { NavigationContainer } from "@react-navigation/native";
import React from "react";


import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./App/Screens/Home";
import Stats from "./App/Screens/Stats";
import Settings from "./App/Screens/Settings";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Stats" component={Stats} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;