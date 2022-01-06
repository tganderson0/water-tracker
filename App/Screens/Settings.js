import React, { useState } from "react";
import { Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getSettings, updateSettings } from "../Database/DAO";

const Settings = () => {

  const [settings, setSettings] = useState(getSettings())
  const [currentGoal, setCurrentGoal] = useState(String(settings[0].goalAmount))
  const [units, setUnits] = useState(settings[0].preferredUnits)
  const [drinkSize, setDrinkSize] = useState(settings[0].standardDrinkSize ? String(settings[0].standardDrinkSize) : '')
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView
    style={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      margin: 8,
    }}
    >
      <Text style={{marginBottom: 16}}>Note: This will not affect old days</Text>
      
        <Text>Set Goal Amount</Text>
        <TextInput
        value={currentGoal} 
        onChangeText={value => setCurrentGoal(value)} 
        placeholder="Enter your goal for water"  
        style={styles.input}
        keyboardType="numeric"
        />
        <Text>Set Unit Type</Text>
        <TextInput
        value={units} 
        onChangeText={value => setUnits(value)} 
        placeholder="Enter your preferred unit type"  
        style={styles.input}
        keyboardType="default"
        />
        <Text>Set Default Drink Size</Text>
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

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '60%',
    marginBottom: 24,
  },

})

export default Settings;