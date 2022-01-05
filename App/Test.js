import React, { useState } from "react";
import { Text, SafeAreaView, Button, View, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import { getAllWater, getToday, findByGoal, resetDatabase, addWater } from "./Database/DAO";
import ProgressCircle from 'react-native-progress-circle';

const Test = () => {
  // takes the form {date: xxx, current: xxx, goal: xxx}
  const [water, setWater] = useState(getToday()[0]);
  const [waterPerPress, setWaterPerPress] = useState();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <View
        style={{
          margin: 16,
          marginTop: 32,
        }}
      >
        <ProgressCircle
          percent={water.current/water.goal * 100}
          radius={100}
          borderWidth={16}
          color="#3399FF"
          shadowColor="#999"
          bgColor="#fff"
          >
          <Text style={{ fontSize: 18 }}>{Math.round(water.current/water.goal * 100)}%</Text>
        </ProgressCircle>
      </View>
      
      <Text>Current Water: {water.current} mL</Text>
      <Text>Goal: {water.goal} mL</Text>
      {/* <Text>{JSON.stringify(water)}</Text> */}
      <TextInput 
      value={waterPerPress} 
      onChangeText={value => setWaterPerPress(value)} 
      placeholder="Enter how much water you drank!"  
      style={styles.input}
      keyboardType="numeric"
      />
      <Button title="Add Water" onPress={() => {
        addWater(water, parseFloat(waterPerPress))
        setWater(getToday()[0])
        }}/>

      <Button title="Subtract Water" onPress={() => {
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


const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '60%'
  },

})

export default Test;

// Code that shows how to add to database
// for(let i = 0; i < 3; i++){
//   realm.write(() => {
//     const book = realm.create('Book', {
//       title: 'Barry Butter' + i,
//       pages:  400
//     });
//   });
// }

