import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type {
  SelectPhoneStackParamList,
  ColorKey,
  Phone,
} from "../types";

import { PHONE_COLORS, COLOR_ORDER } from "../data/phones";
import { colors, formatPrice } from "../theme";

type Props =
  NativeStackScreenProps<SelectPhoneStackParamList, "ChooseColor"> & {
    phone: Phone;
  };

export function ChooseColorScreen({
  navigation,
  route,
  phone,
}: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(
    route.params?.color
  );

  const shown = picked ?? phone.defaultColor;
  const [line1, line2] = phone.name.split(" - ");

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[shown].image}
          style={styles.thumb}
          resizeMode="contain"
        />

        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2 ?? ""}</Text>

          {picked && (
            <>
              <Text style={styles.detail}>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={styles.detail}>
                Cung cấp bởi{" "}
                <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={styles.price}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>

        {COLOR_ORDER.filter((key) => phone.colors.includes(key)).map((key) => (
          <Pressable
            key={key}
            onPress={() => setPicked(key)}
            style={[
              styles.swatchRow,
              picked === key && styles.swatchSelected,
            ]}
          >
            <View
              style={[
                styles.swatch,
                { backgroundColor: PHONE_COLORS[key].hex },
              ]}
            />
            <Text style={styles.colorName}>{PHONE_COLORS[key].label}</Text>
            {picked === key && <Text style={styles.check}>✓</Text>}
          </Pressable>
        ))}

        <Pressable
          style={styles.doneBtn}
          onPress={() =>
            navigation.navigate("Product", { color: picked }, { merge: true })
          }
        >
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    padding: 16,
    minHeight: 150,
    alignItems: "center",
  },
  thumb: {
    width: 110,
    height: 130,
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  small: {
    color: colors.text,
    marginBottom: 5,
  },
  detail: {
    color: colors.text,
    marginTop: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  price: {
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 6,
  },
  body: {
    backgroundColor: colors.grey,
    padding: 18,
    flexGrow: 1,
  },
  hint: {
    fontSize: 17,
    marginBottom: 14,
  },
  swatchRow: {
    backgroundColor: "#fff",
    minHeight: 64,
    marginBottom: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  swatchSelected: {
    borderColor: colors.blue,
  },
  swatch: {
    width: 38,
    height: 38,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.line,
  },
  colorName: {
    marginLeft: 12,
    fontSize: 16,
    textTransform: "capitalize",
  },
  check: {
    marginLeft: "auto",
    fontSize: 20,
    color: colors.blue,
    fontWeight: "bold",
  },
  doneBtn: {
    marginTop: 10,
    backgroundColor: colors.blue,
    height: 46,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  doneText: {
    color: "#fff",
    fontWeight: "bold",
  },
});