
import React, {
  createContext,
  useContext,
  useState,
} from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import type { CompositeScreenProps } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  createBottomTabNavigator,
  type BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import type { Phone } from "../types";
import { PHONES } from "../data/phones";
import { colors, formatPrice } from "../theme";

// ===== BÀI 4: KHAI BÁO KIỂU ROUTE =====
type RootStackParamList = {
  Home: undefined;
  ProductDetails: { id: string };
};

type HomeTabParamList = {
  Products: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<HomeTabParamList>();

// ===== BÀI 4: CONTEXT LƯU DANH SÁCH YÊU THÍCH =====
type FavoritesContextType = {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const isFavorite = (id: string) => favoriteIds.includes(id);

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites phải nằm trong FavoritesProvider");
  }

  return context;
}

// ===== BÀI 4: APP CHÍNH =====
export function Ex4App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ title: "Chi tiết sản phẩm" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}

// Tab nằm trong màn hình Home của Stack.
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        tabBarActiveTintColor: colors.red,
        tabBarIcon: ({ color, size }) => {
          const iconName =
            route.name === "Products"
              ? "phone-portrait-outline"
              : "heart-outline";

          return (
            <Ionicons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{ title: "Sản phẩm", tabBarLabel: "Sản phẩm" }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: "Yêu thích", tabBarLabel: "Yêu thích" }}
      />
    </Tab.Navigator>
  );
}

// ===== BÀI 4: TAB SẢN PHẨM =====
type ProductsProps = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, "Products">,
  NativeStackScreenProps<RootStackParamList>
>;

function ProductsScreen({ navigation }: ProductsProps) {
  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Danh sách điện thoại</Text>

      <FlatList
        data={PHONES}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProductRow
            phone={item}
            onPress={() =>
              navigation.navigate("ProductDetails", {
                id: String(item.id),
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Chưa có sản phẩm.</Text>
        }
      />
    </View>
  );
}

// ===== BÀI 4: TAB SẢN PHẨM YÊU THÍCH =====
type FavoritesProps = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, "Favorites">,
  NativeStackScreenProps<RootStackParamList>
>;

function FavoritesScreen({ navigation }: FavoritesProps) {
  const { favoriteIds } = useFavorites();

  const favoritePhones = PHONES.filter((phone) =>
    favoriteIds.includes(String(phone.id))
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Sản phẩm yêu thích</Text>

      <FlatList
        data={favoritePhones}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProductRow
            phone={item}
            onPress={() =>
              navigation.navigate("ProductDetails", {
                id: String(item.id),
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Bạn chưa có sản phẩm yêu thích. Hãy mở chi tiết sản phẩm và bấm trái tim.
          </Text>
        }
      />
    </View>
  );
}

// ===== BÀI 4: TRUYỀN id VÀO MÀN HÌNH CHI TIẾT =====
type DetailsProps = NativeStackScreenProps<
  RootStackParamList,
  "ProductDetails"
>;

function ProductDetailsScreen({ route }: DetailsProps) {
  const { id } = route.params;
  const phone = PHONES.find((item) => String(item.id) === id);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!phone) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy sản phẩm có ID {id}.</Text>
      </View>
    );
  }

  const saved = isFavorite(String(phone.id));

  return (
    <View style={styles.detailsScreen}>
      <View style={styles.phoneIllustration}>
        <Ionicons
          name="phone-portrait-outline"
          size={100}
          color={colors.blue}
        />
      </View>

      <Text style={styles.detailName}>{phone.name}</Text>

      <Text style={styles.detailRating}>
        ★ {phone.rating ?? 0} · {phone.reviewCount ?? 0} đánh giá
      </Text>

      <Text style={styles.detailPrice}>{formatPrice(phone.price)}</Text>
      <Text style={styles.detailSupplier}>
        Nhà cung cấp: {phone.supplier}
      </Text>

      <Pressable
        style={[styles.favoriteButton, saved && styles.favoriteButtonActive]}
        onPress={() => toggleFavorite(String(phone.id))}
      >
        <Ionicons
          name={saved ? "heart" : "heart-outline"}
          size={22}
          color={saved ? "#FFFFFF" : colors.red}
        />
        <Text
          style={[
            styles.favoriteButtonText,
            saved && styles.favoriteButtonTextActive,
          ]}
        >
          {saved ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
        </Text>
      </Pressable>

      <Text style={styles.idText}>Mã sản phẩm: {id}</Text>
    </View>
  );
}

// Thành phần dùng chung trong hai tab.
function ProductRow({
  phone,
  onPress,
}: {
  phone: Phone;
  onPress: () => void;
}) {
  const { isFavorite } = useFavorites();
  const saved = isFavorite(String(phone.id));

  return (
    <Pressable style={styles.productCard} onPress={onPress}>
      <View style={styles.productIcon}>
        <Ionicons
          name="phone-portrait-outline"
          size={36}
          color={colors.blue}
        />
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productName}>{phone.name}</Text>
        <Text style={styles.productPrice}>{formatPrice(phone.price)}</Text>
        <Text style={styles.productRating}>
          ★ {phone.rating ?? 0}
          {saved ? "   ♥ Đã yêu thích" : ""}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={22} color="#777777" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F5F7",
    padding: 14,
  },
  heading: {
    fontSize: 21,
    fontWeight: "700",
    color: "#1F2430",
    marginBottom: 14,
  },
  list: {
    paddingBottom: 20,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E3E6EC",
  },
  productIcon: {
    width: 64,
    height: 74,
    backgroundColor: "#EEF2FF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2430",
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.red,
    marginBottom: 4,
  },
  productRating: {
    fontSize: 12,
    color: "#8A6500",
  },
  empty: {
    color: "#777777",
    textAlign: "center",
    marginTop: 28,
    lineHeight: 22,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  detailsScreen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  phoneIllustration: {
    height: 210,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  detailName: {
    fontSize: 21,
    fontWeight: "700",
    color: "#1F2430",
    marginBottom: 10,
  },
  detailRating: {
    color: "#8A6500",
    marginBottom: 12,
  },
  detailPrice: {
    color: colors.red,
    fontSize: 23,
    fontWeight: "800",
    marginBottom: 12,
  },
  detailSupplier: {
    fontSize: 14,
    color: "#555555",
    marginBottom: 22,
  },
  favoriteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.red,
    borderRadius: 8,
  },
  favoriteButtonActive: {
    backgroundColor: colors.red,
  },
  favoriteButtonText: {
    color: colors.red,
    fontSize: 15,
    fontWeight: "700",
  },
  favoriteButtonTextActive: {
    color: "#FFFFFF",
  },
  idText: {
    color: "#777777",
    marginTop: 18,
    fontSize: 12,
  },
});
