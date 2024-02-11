
import { View  , Text, StyleSheet , ActivityIndicator,Dimensions, ScrollView } from "react-native";
import React, {useEffect, useState} from "react";
import * as Location from 'expo-location';

//const {width:SCREEN_WIDTH} = Dimensions.get('window'); //object를 get
const SCREEN_WIDTH = Dimensions.get('window').width;

const API_KEY = "784ab24ff2ed5d94d4288abed9e25d13";

export default function App(){
  const [city, setCity] = useState("Loading...")
  const[days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async()=>{
    //const permission = await Location.requestPermissionsAsync(); //if granted, we can ask location but, if not, we cant ask location and will change UI 
    const {granted} = await Location.requestPermissionsAsync(); //in permission object, there is a 'granted'
    if(!granted){
      setOk(false);
    }

    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5})
    const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps:false})
    setCity(location[0].city);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    setDays(json.daily);
  };
  useEffect(()=>{
    getWeather();
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}> {city}</Text>
      </View>
      <ScrollView pagingEnabled horizontal contentContainerStyle={styles.weather}> 
         {days.length===0 ?
         (<View style={styles.day}>
         <ActivityIndicator color="black"></ActivityIndicator>  
          </View>) : 
          (days.map((day, index)=>
          <View key={index} style={styles.day}> 
            <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
            <Text style = {styles.day}>{day.weather[0].main}</Text>
          </View>))
         
         }
          
      </ScrollView>
    </View>
  )
};

  const styles= StyleSheet.create({  
    container: {
    flex:1,
    backgroundColor:"lavender",
  },
    city:{
      flex:1,
      justifyContent:"center", 
      alignItems:"center",
  },
    cityName:{
      fontSize:68,
      fontWeight:"500",
  },
    weather:{
      backgroundColor:"teal",
    },
    day:{
      // flex:1,
      width: SCREEN_WIDTH, //demension으로 화면의 너비만큼 day의 너비를 지정
      alignItems:"center",
    },
    temp:{
      marginTop: 50,
      fontSize:178,
    },
    description:{
      marginTop:-38,
    fontSize:60,
    }
})
