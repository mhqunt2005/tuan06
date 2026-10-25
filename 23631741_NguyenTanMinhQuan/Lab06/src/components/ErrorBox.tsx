import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

type ErrorBoxProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorBox({ message, onRetry }: ErrorBoxProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Không tải được dữ liệu</Text>
      <Text style={styles.message}>{message}</Text>
      <Button title="Thử lại" onPress={onRetry} />
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  message: {
    textAlign: "center",
    marginBottom: 16,
  },
});