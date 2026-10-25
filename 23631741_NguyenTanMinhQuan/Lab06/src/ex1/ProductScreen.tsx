
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { ColorKey, Phone, SelectPhoneStackParamList } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<
  SelectPhoneStackParamList,
  "Product"
> & {
  phone: Phone;
};

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked: ColorKey | undefined = route.params?.color;
  const shown = picked ?? phone.defaultColor;

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageWrap}>
          <Image
            source={PHONE_COLORS[shown].image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.name}>{phone.name}</Text>

        <View style={styles.ratingRow}>
          <Text style={styles.stars}>{"★".repeat(phone.rating ?? 5)}</Text>
          <Text style={styles.review}>
            ({phone.reviewCount ?? 0} đánh giá)
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          {phone.oldPrice > phone.price && (
            <Text style={styles.oldPrice}>
              {formatPrice(phone.oldPrice)}
            </Text>
          )}
        </View>

        <Pressable
          style={styles.chooseBtn}
          onPress={() =>
            navigation.navigate("ChooseColor", { color: shown })
          }
        >
          <Text style={styles.chooseText}>
            4 MÀU - CHỌN {picked ? "LOẠI" : "MÀU"}
          </Text>
          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <Text style={styles.supplier}>
          Cung cấp bởi:{" "}
          <Text style={styles.supplierBold}>{phone.supplier}</Text>
        </Text>

        <Text style={styles.badge}>{phone.badge}</Text>
      </ScrollView>

      <Pressable style={styles.buyBtn} onPress={() => {}}>
        <Text style={styles.buyText}>CHỌN MUA</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  imageWrap: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 17,
    color: colors.text,
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  stars: {
    color: "#F5C518",
    fontSize: 20,
  },
  review: {
    marginLeft: 10,
    fontSize: 13,
    color: colors.muted,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  price: {
    fontSize: 21,
    fontWeight: "700",
    color: "#111111",
  },
  oldPrice: {
    fontSize: 15,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
  chooseBtn: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: "#D8DCE3",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    paddingHorizontal: 14,
  },
  chooseText: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  arrow: {
    fontSize: 28,
    color: colors.text,
  },
  supplier: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 12,
  },
  supplierBold: {
    fontWeight: "700",
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#FCE8E6",
    color: "#C62828",
    fontSize: 11,
    fontWeight: "700",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  buyBtn: {
    backgroundColor: colors.red,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buyText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
