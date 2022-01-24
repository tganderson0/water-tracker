import React, { useState } from "react";
import { Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Button, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getSettings, updateSettings } from "../Database/DAO";

const Settings = () => {

  const [settings, setSettings] = useState(getSettings())
  const [currentGoal, setCurrentGoal] = useState(String(settings[0].goalAmount))
  const [units, setUnits] = useState(settings[0].preferredUnits)
  const [drinkSize, setDrinkSize] = useState(settings[0].standardDrinkSize ? String(settings[0].standardDrinkSize) : '')

  const isLight = useColorScheme() === 'light';

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: '60%',
      marginBottom: 24,
      borderColor: isLight ? 'black' : 'white',
      color: isLight ? 'black' : 'white',
    },
    text: {
      color: isLight ? 'black' : 'white',
    }
  
  })

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView
    style={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
      backgroundColor: isLight ? 'rgb(242, 242, 247)' : 'rgb(28, 28, 30)',
    }}
    >
      <Text style={[{marginBottom: 16}, styles.text]}>Note: This will not affect old days</Text>
      
        <Text style={styles.text}>Set Goal Amount</Text>
        <TextInput
        value={currentGoal} 
        onChangeText={value => setCurrentGoal(value)} 
        placeholder="Enter your goal for water"  
        style={styles.input}
        keyboardType="numeric"
        />
        <Text style={styles.text}>Set Unit Type</Text>
        <TextInput
        value={units} 
        onChangeText={value => setUnits(value)} 
        placeholder="Enter your preferred unit type"  
        style={styles.input}
        keyboardType="default"
        />
        <Text style={styles.text}>Set Default Drink Size</Text>
        <TextInput
        value={drinkSize} 
        onChangeText={value => setDrinkSize(value)} 
        placeholder="Enter your standard drink size"  
        style={styles.input}
        keyboardType="numeric"
        />

        <Button 
          title="Save Settings"
          onPress={() => {
            updateSettings(parseFloat(currentGoal), units, parseFloat(drinkSize))
            setSettings(getSettings())
          }}
        />
    </SafeAreaView>
    </TouchableWithoutFeedback>

  )
}



export default Settings;