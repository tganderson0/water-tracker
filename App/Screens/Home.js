import React, { useState, useEffect } from "react";
import { Text, Button, View, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, Appearance } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToday, resetDatabase, addWater, getSettings } from "../Database/DAO";
import { useIsFocused } from "@react-navigation/native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const Home = () => {
  const [water, setWater] = useState(getToday()[0]);
  const [waterPerPress, setWaterPerPress] = useState(getSettings()[0].standardDrinkSize ? String(getSettings()[0].standardDrinkSize) : '');
  const [unit, setUnit] = useState(getSettings()[0].preferredUnits)
  const isFocused = useIsFocused()

  

  const [isLight, setIsLight] = useState(Appearance.getColorScheme() === 'light')

  Appearance.addChangeListener(() => {
    setIsLight(Appearance.getColorScheme() === 'light')
  })
  

    useEffect(() => {
        setWater(getToday()[0])
        setWaterPerPress(getSettings()[0].standardDrinkSize ? String(getSettings()[0].standardDrinkSize) : '');
        setUnit(getSettings()[0].preferredUnits)
    } , [isFocused])
  

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: '60%',
      borderColor: isLight ? 'black' : 'white',
      color: isLight ? 'black' : 'white',
    },
    text: {
      color: isLight ? 'black' : 'white'
    }
  
  })

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: isLight ? 'rgb(242, 242, 247)' : 'rgb(28, 28, 30)'
    }}>
      <View
        style={{
          margin: 16,
          marginTop: 32,
        }}
      >
        <AnimatedCircularProgress
          size={300}
          width={32}
          rotation={0}
          fill={Math.round(water.current/water.goal * 100)}
          tintColor="#3399FF"
          backgroundColor="#999">
          {
            (fill) => (
              <Text style={[{ fontSize: 36 }, styles.text]}>
                { Math.round(water.current/water.goal * 100) }%
              </Text>
            )
          }
        </AnimatedCircularProgress>
      </View>
      
      <Text style={styles.text}>Current Water: {water.current} {unit}</Text>
      <Text style={styles.text}>Goal: {water.goal} {unit}</Text>
      {/* <Text>{JSON.stringify(water)}</Text> */}
      <TextInput 
      value={waterPerPress} 
      onChangeText={value => setWaterPerPress(value)} 
      placeholder="Enter how much water you drank!"  
      style={styles.input}
      keyboardType="numeric"
      />
      <Button title="Add Water" onPress={() => {
        if (waterPerPress !== '')
        addWater(water, parseFloat(waterPerPress))
        setWater(getToday()[0])
        }}/>

      <Button title="Subtract Water" onPress={() => {
        if (waterPerPress !== '')
        addWater(water, -parseFloat(waterPerPress))
        setWater(getToday()[0])
      } } />
        <Button title="Reset Database" onPress={() => {
          resetDatabase()
          setWater(getToday()[0])
        }} /> 
    </SafeAreaView>
    </TouchableWithoutFeedback>
    
  )
}




export default Home;

// Code that shows how to add to database
// for(let i = 0; i < 3; i++){
//   realm.write(() => {
//     const book = realm.create('Book', {
//       title: 'Barry Butter' + i,
//       pages:  400
//     });
//   });
// }

