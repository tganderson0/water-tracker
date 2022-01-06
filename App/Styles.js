import { StyleSheet, Appearance } from "react-native";

const colors = StyleSheet.create({
  standardTextColor: {
    color: Appearance.getColorScheme() === 'light' ? 'black' : 'white'
  },

  standardBackgroundColor: {
    backgroundColor: Appearance.getColorScheme() === 'light' ? 'white' : 'black'
  },
})

export default colors;