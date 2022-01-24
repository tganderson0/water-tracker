import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, Appearance, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPastWeek, getStreak} from "../Database/DAO";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

const Stats = () => {
  const [allDays, setAllDays] = useState(getPastWeek());
  const [streak, setStreak] = useState(getStreak());
  const isFocused = useIsFocused();

  const sum = (previous, current) => current.current / current.goal + previous;
  const getAverageCompletion = (days) => {
    return Math.round((allDays.slice(0, allDays.length-1).reduce(sum, 0) / (allDays.length - 1)) * 100)
  }

  let average = getAverageCompletion(allDays);


    useEffect(() => {
        setAllDays(getPastWeek());
        setStreak(getStreak());
        average = getAverageCompletion(allDays);
    } , [isFocused])


  const isLight = useColorScheme() === 'light';

  const styles = StyleSheet.create({
    text: {
      fontSize: 24,
      margin: 8,
      fontWeight: 'bold',
      color: isLight ? 'black' : 'white',
    }
  })

  return (
    <SafeAreaView style= {{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isLight ? 'rgb(242, 242, 247)' : 'rgb(28, 28, 30)',
    }}>
      
      <FontAwesomeIcon icon={faFire} color={streak.currentStreak > 0 ? 'tomato' : 'grey'} size={200}/>

      <Text style={styles.text}>Streak</Text>
      <Text style={styles.text}>{streak.currentStreak} day{streak.currentStreak == 1 ? '' : 's'}</Text>
      <Text style={styles.text}>Average per day: {Number.isNaN(average) ? 0 : average}%</Text>
    </SafeAreaView>
  )
}



export default Stats;