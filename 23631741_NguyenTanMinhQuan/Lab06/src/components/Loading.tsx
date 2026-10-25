import React from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
} from "react-native";

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1976D2" />
      <Text style={styles.text}>Đang tải dữ liệu điện thoại...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    marginTop: 12,
    fontSize: 16,
  },
});