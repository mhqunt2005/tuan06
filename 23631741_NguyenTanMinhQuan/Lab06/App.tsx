
import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { PHONES } from "./src/data/phones";
import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { Ex3App } from "./src/ex3/Ex3App";
import { Ex4App } from "./src/ex4/Ex4App";
import { Ex5App } from "./src/ex5/Ex5App";

type Exercise = "menu" | "1" | "2" | "3" | "4" | "5";

export default function App() {
  const [exercise, setExercise] = useState<Exercise>("menu");

  if (exercise !== "menu") {
    return (
      <View style={styles.app}>
        <SafeAreaView style={styles.backBar}>
          <Pressable
            onPress={() => setExercise("menu")}
            style={styles.backButton}
          >
            <Text style={styles.backText}>‹ MENU BÀI TẬP</Text>
          </Pressable>
        </SafeAreaView>

        <View style={styles.exercise}>
          {exercise === "1" && <SelectPhoneApp phone={PHONES[0]} />}
          {exercise === "2" && <SelectPhoneApi />}
          {exercise === "3" && <Ex3App />}
          {exercise === "4" && <Ex4App />}
          {exercise === "5" && <Ex5App />}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.menu}>
      <Text style={styles.title}>LAB 06 - NAVIGATION</Text>
      <Text style={styles.subtitle}>Chọn bài tập để chạy</Text>

      <ExerciseButton
        title="Bài 1 - Select Phone"
        description="Chọn màu điện thoại và trả kết quả"
        onPress={() => setExercise("1")}
      />

      <ExerciseButton
        title="Bài 2 - API"
        description="Fetch, Loading, Error và Retry"
        onPress={() => setExercise("2")}
      />

      <ExerciseButton
        title="Bài 3 - Bottom Tab"
        description="Home, Search và Profile"
        onPress={() => setExercise("3")}
      />

      <ExerciseButton
        title="Bài 4 - Stack + Tab + Params"
        description="Chi tiết sản phẩm và danh sách yêu thích"
        onPress={() => setExercise("4")}
      />

      <ExerciseButton
        title="Bài 5 - Drawer"
        description="Home, Profile và Settings với Switch"
        onPress={() => setExercise("5")}
      />

      <Text style={styles.footer}>Lab 06 — Navigation</Text>
    </SafeAreaView>
  );
}

function ExerciseButton({
  title,
  description,
  onPress,
}: {
  title: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.exerciseButton} onPress={onPress}>
      <Text style={styles.exerciseTitle}>{title}</Text>
      <Text style={styles.exerciseDescription}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#F4F5F7",
  },
  backBar: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backText: {
    color: "#D32F2F",
    fontSize: 14,
    fontWeight: "700",
  },
  exercise: {
    flex: 1,
  },
  menu: {
    flex: 1,
    backgroundColor: "#F4F5F7",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "800",
    color: "#172554",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 24,
  },
  exerciseButton: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E4EB",
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2430",
    marginBottom: 5,
  },
  exerciseDescription: {
    fontSize: 13,
    color: "#6B7280",
  },
  footer: {
    textAlign: "center",
    color: "#777777",
    fontSize: 12,
    marginTop: 8,
  },
});
