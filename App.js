import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, Dimensions, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Fontisto } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};
export default function App() {
  const [days, setDays] = useState([]);
  const [city, setCity] = useState(["Loading", ""]);
  const [ok, setOk] = useState(true);

  const API_KEY = "5b6469430a7ba339ad8e4e12d62ab57a";

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMap: false });

    const str = [location[0].city, location[0].district];
    setCity(str);

    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    const json = await res.json();
    setDays([
      json.list[0],
      ...json.list.filter((weather, index) => {
        if (index !== 0 && weather.dt_txt.includes("00:00:00")) {
          return weather;
        }
      }),
    ]);
    console.log(days[0]); 
  };

  useEffect(() => {
    getWeather();
  }, []);

  const DatetypeChange = (date) => {
    var date = new Date(date);
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var day = String(date.getDate()).padStart(2, "0");
    var formattedDate = year + "." + month + "." + day;

    return formattedDate;
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.city}>
        <Text style={styles.cityName}>
          {city[0]}
          {"\n"}
          {city[1]}
        </Text>
      </View>
      <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weather}>
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color="white" style={{ marginTop: 10 }} size="large" />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.tinyText1}>{DatetypeChange(day.dt_txt)}</Text>
              <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:WIDTH,paddingRight:20,paddingLeft:20}}>
                <Text style={styles.temp}>
                  {parseFloat(day.main.temp).toFixed(1)}
                  <Text style={styles.tinyText3}>°C</Text>
                </Text>
                <Text style={styles.description}>
                  <Fontisto name={icons[day.weather[0].main]} size={68} color="black" />
                </Text>
              </View>
              <Text style={styles.tinyText2}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    flex: 1,
    backgroundColor: "#fff",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 48,
    fontWeight: 500,
    width: WIDTH,
    height: "auto",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 50,
  },
  wheater: {},
  day: {
    width: WIDTH,
    marginTop: 20,
    alignItems: "center",
  },
  temp: {
    fontSize: 80,
  },
  description: {
    fontSize: 80,
  },
  tinyText1: {
    fontSize: 24,
  },
  tinyText3: {
    fontSize: 48,
    fontWeight: 700,
  },
});
