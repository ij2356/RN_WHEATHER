import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, TouchableHighlight, TouchableWithoutFeedback, Pressable } from "react-native";
import { theme } from "./colors";

export default function App() {
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

  const addTodo = () => {
    if (text === "") {
      alert("빈값입니다.");
      return;
    }
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, work: working },
    };
    setToDos(newToDos);
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
        {Object.keys(toDos).map((value) => (
          <View style={styles.todoInner}>
            <Text style={styles.todo}>{toDos[value].text}</Text>
          </View>
        ))}
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
    bacckground: theme.bg,
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
