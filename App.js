import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, TouchableHighlight, TouchableWithoutFeedback, Pressable } from "react-native";
import { theme } from "./colors";


const STORAGE_KEY = "@toDos";
export default function App() {
  useEffect(() => {
    loadTodo();
  },[])
  const [work, setWork] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const changeText = (payload) => {
    setText(payload);
  };
  const working = () => {
    setWork(true);
  };
  const travel = () => {
    setWork(false);
  };
  const saveTodo = async (saveValue) => {
    await AsyncStorage.setItem(STORAGE_KEY,JSON.stringify(saveValue));
  }
  const loadTodo = async () => {
    await AsyncStorage.getItem(JSON.parse(STORAGE_KEY))
  }

  const addTodo = async () => {
    if (text === "") {
      alert("빈값입니다.");
      return;
    }
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, work },
    };
    setToDos(newToDos);
    saveTodo(newToDos);
    setText("");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={working}>
          <Text style={{ ...styles.btnText, color: work ? "#fff" : theme.grey }}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{ ...styles.btnText, color: !work ? "#fff" : theme.grey }}>Travel</Text>
        </TouchableOpacity>
      </View>
      <TextInput onSubmitEditing={addTodo} returnKeyType="done" style={styles.input} placeholder={work ? "어떤일을 하실건가요?" : "여행을 떠나실 장소는?"} value={text} onChangeText={changeText} />
      <ScrollView>
        {Object.keys(toDos).map((value, key) =>
          toDos[value].work == work ? (
            <View style={styles.todoInner} key={`a${ key }`}>
              <Text style={styles.todo}>{toDos[value].text}</Text>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
    color: "white",
  },
  input: {
    fontSize: 20,
    marginTop: 40,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  todo: {
    fontSize: 20,
    backgroundColor: theme.bg,
    color: "#fff",
  },
  todoInner: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.grey,
    marginVertical: 12,
    borderRadius: 15
  }
});
