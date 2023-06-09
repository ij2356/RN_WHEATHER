import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";

const WIDTH = Dimensions.get("window").width;

export default function App() {
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);

  const ask = async () => {
    const {granted} = await Location.requestForegroundPermissionsAsync(); 
    if (!granted) {
      setOk(false);
    }
    const { coords : {latitude, longitude}} = await Location.getCurrentPositionAsync({ accuracy: 5 })
    const location = await Location.reverseGeocodeAsync({ latitude, longitude });
    
  }

  useEffect(() => {
    ask();
  }, []);

  
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>SEUOL</Text>
      </View>
      <ScrollView horizontal pagingEnabled style={styles.wheater}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: 500,
  },
  wheater: {
    flex:3,
  },
  day: {
    width: WIDTH,
    marginTop:20,
    alignItems: 'center',
  },
  temp: {
    fontSize: 178,
  },
  description: {
    fontSize: 80,
  },
});
