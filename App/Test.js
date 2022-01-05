import React, { useState } from "react";
import { Text, SafeAreaView, Button } from "react-native";
import { getAllWater, getToday, findByGoal, resetDatabase, addWater } from "./Database/DAO";
import ProgressCircle from 'react-native-progress-circle';

const Test = () => {
  // takes the form {date: xxx, current: xxx, goal: xxx}
  const [water, setWater] = useState(getToday()[0]);
  const [waterPerPress, setWaterPerPress] = useState(8);
  return (
    <SafeAreaView style={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center'
    }}>
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
      <Text>Current Water: {water.current} mL</Text>
      <Text>Goal: {water.goal} mL</Text>
      <Text>{JSON.stringify(water)}</Text>
      <Button title="Add Water" onPress={() => {
        addWater(water, waterPerPress)
        setWater(getToday()[0])
        }}/>
        <Button title="Reset Database" onPress={() => {
          resetDatabase()
          setWater(getToday()[0])
        }} />
    </SafeAreaView>
  )
}

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

