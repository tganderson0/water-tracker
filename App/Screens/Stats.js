import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllWater } from "../Database/DAO";

const Stats = () => {
  const allDays = getAllWater();

  return (
    <SafeAreaView>
      <Text>Stats Screen</Text>
      {allDays.map(day => (
        <Text>{JSON.stringify(day)}</Text>
      ))}
    </SafeAreaView>
  )
}

export default Stats;