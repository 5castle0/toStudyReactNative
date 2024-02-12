import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput} from "react-native";
import { theme } from "./colors";
import {useState} from "react"


export default function App(){
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  
  return(
  <View style={styles.container}>
    <StatusBar style="auto" />
    <View style={styles.header}>
      <TouchableOpacity onPress={work}>
        {/* 스타일을 object로 사용하면서 동시에 그것을 확장하는 방법 -> 중괄호 두번 + '...'  */}
        <Text style={{...styles.btnText, color: working ? "white" : theme.grey}}>Work</Text> 
      </TouchableOpacity>
      <TouchableOpacity onPress={travel}>
        <Text style={{...styles.btnText, color: !working ? "white" : theme.grey}}>Travel</Text>    
      </TouchableOpacity>  
      </View>
      <TextInput 
        onChangeText={onChangeText} 
        placeholder={working ? "Add a To Do": "Where do you want to go?"} 
        style={styles.input}
        value={text}
        ></TextInput>
  </View>
  ); 
} 

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: theme.bg,
    paddingHorizontal:20,
  },
  header:{
    justifyContent:"space-between",
    flexDirection:"row",
    marginTop:100,
  },
  btnText:{
    fontSize:44,
    fontWeight:"600",
  },
  input:{
    backgroundColor:"white",
    paddingVertical:15,  //input창에서 수직적으로 padding을 추가해줌
    paddingHorizontal: 20,   // input창에서 수평적으로 padding을 추가해줌
    borderRadius:30,   //input창의 모습을 둥글게 만들어줌
    marginTop:10,   
    fontSize:18,

  }
})