import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Alert} from "react-native";
import { theme } from "./colors";
import {useState ,useEffect} from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto } from '@expo/vector-icons';

const STORAGE_KEY="@toDos"
export default function App(){
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos,setToDos] = useState({}); //[]을 써서 구현할 수도 있음
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const saveToDos= async (toSave)=>{
    await AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(toSave))
  };
  const loadToDos = async() =>{
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    setToDos(JSON.parse(s)); // parse는 string을 js object로 만들어줌
  };
  useEffect(()=>{
    loadToDos();
  },[]);
  const addToDo = async () => {
    if(text===""){ //아무것도 입력을 하지 않았을 때
      return
    }
    //const newToDos = Object.assign({},toDos,{[Date.now()]:{text,work:working}}) //to add object
    const newToDos = {...toDos,[Date.now()]:{text,working}} //same thing with upper code
    setToDos(newToDos);
    setText("");
    await saveToDos(newToDos);
  }
  const deleteToDo = (key)=>{
    Alert.alert("Delete To Do?","Are you sure?",[
      {text:"Cancel"},
      {text:"I'm Sure" , onPress: async ()=>  {const newToDos = {...toDos}; //style:"destructive" -> only ios
      delete newToDos[key];
      setToDos(newToDos);
      saveToDos(newToDos);
    },}
    ]); //팝업창
    
    return;
  
  }

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
        onSubmitEditing={addToDo}
        onChangeText={onChangeText} 
        placeholder={working ? "Add a To Do": "Where do you want to go?"} 
        style={styles.input}
        value={text}
        ></TextInput>
        <ScrollView>
          {Object.keys(toDos).map((key) => 
          toDos[key].working===working?  ///조건문
          (<View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
              <TouchableOpacity onPress={()=>deleteToDo(key)}>
              <Fontisto name="trash" size={18} color={theme.gray} />
              </TouchableOpacity>
              
            </View>) : null)}
        </ScrollView>
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
    marginVertical:10,   
    fontSize:18,
  },
  toDo:{
    backgroundColor:theme.toDoBg,
    marginBottom:10,
    paddingVertical:20,
    paddingHorizontal:20,
    borderRadius:15,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",

  },
  toDoText:{
    color:"white",
    fontSize:16,
    fontWeight:"500",

  }
})