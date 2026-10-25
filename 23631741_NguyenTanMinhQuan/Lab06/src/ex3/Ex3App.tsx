
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import type { Phone } from "../types";
import { PHONES } from "../data/phones";
import { API_URL, USING_API } from "../api/phoneApi";
import { colors, formatPrice } from "../theme";

type TabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

// Lấy danh sách điện thoại từ MockAPI.
async function fetchPhones(): Promise<Phone[]> {
  if (!USING_API) {
    return PHONES;
  }

  const response = await fetch(`${API_URL}/phones`);

  if (!response.ok) {
    throw new Error(`Không tải được danh sách: lỗi ${response.status}`);
  }

  const data = (await response.json()) as Phone[];

  if (!Array.isArray(data)) {
    throw new Error("Dữ liệu API không phải danh sách điện thoại");
  }

  return data;
}

export function Ex3App() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPhones = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchPhones();
      setPhones(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Không thể tải danh sách điện thoại"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPhones();
  }, [loadPhones]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.red} />
        <Text style={styles.statusText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={loadPhones}>
          <Text style={styles.retryText}>THỬ LẠI</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTitleAlign: "center",
          tabBarActiveTintColor: colors.red,
          tabBarInactiveTintColor: "#777777",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
          tabBarIcon: ({ color, size }) => {
            let iconName:
              | "home-outline"
              | "search-outline"
              | "person-outline";

            if (route.name === "Home") {
              iconName = "home-outline";
            } else if (route.name === "Search") {
              iconName = "search-outline";
            } else {
              iconName = "person-outline";
            }

            return (
              <Ionicons name={iconName} size={size} color={color} />
            );
          },
        })}
      >
        <Tab.Screen
          name="Home"
          options={{ title: "Trang chủ", tabBarLabel: "Home" }}
        >
          {() => <HomeScreen phones={phones} />}
        </Tab.Screen>

        <Tab.Screen
          name="Search"
          options={{ title: "Tìm kiếm", tabBarLabel: "Search" }}
        >
          {() => <SearchScreen phones={phones} />}
        </Tab.Screen>

        <Tab.Screen
          name="Profile"
          options={{ title: "Tài khoản", tabBarLabel: "Profile" }}
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// BÀI 3 - HOME: hiển thị danh sách bằng FlatList.
function HomeScreen({ phones }: { phones: Phone[] }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Danh sách điện thoại</Text>
      <Text style={styles.subheading}>
        Hiện có {phones.length} sản phẩm
      </Text>

      <FlatList
        data={phones}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Chưa có sản phẩm.</Text>
        }
        renderItem={({ item }) => (
          <PhoneCard phone={item} />
        )}
      />
    </View>
  );
}

// BÀI 3 - SEARCH: lọc sản phẩm theo tên bằng TextInput.
function SearchScreen({ phones }: { phones: Phone[] }) {
  const [keyword, setKeyword] = useState("");

  const filteredPhones = phones.filter((phone) =>
    phone.name.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Tìm kiếm sản phẩm</Text>

      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập tên điện thoại..."
        style={styles.searchInput}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />

      <Text style={styles.resultText}>
        Tìm thấy {filteredPhones.length} sản phẩm
      </Text>

      <FlatList
        data={filteredPhones}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Không tìm thấy điện thoại phù hợp.
          </Text>
        }
        renderItem={({ item }) => (
          <PhoneCard phone={item} />
        )}
      />
    </View>
  );
}

// Thành phần hiển thị một điện thoại dùng chung cho Home và Search.
function PhoneCard({ phone }: { phone: Phone }) {
  return (
    <View style={styles.card}>
      <View style={styles.phoneIcon}>
        <Ionicons name="phone-portrait-outline" size={32} color={colors.blue} />
      </View>

      <View style={styles.phoneInfo}>
        <Text style={styles.phoneName}>{phone.name}</Text>
        <Text style={styles.phonePrice}>{formatPrice(phone.price)}</Text>
        <Text style={styles.phoneRating}>
          ★ {phone.rating ?? 0} · {phone.reviewCount ?? 0} đánh giá
        </Text>
        <Text style={styles.supplier}>{phone.supplier}</Text>
      </View>
    </View>
  );
}

// BÀI 3 - PROFILE: thông tin người dùng.
function ProfileScreen() {
  return (
    <View style={styles.profileScreen}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>U</Text>
      </View>

      <Text style={styles.profileName}>Người dùng</Text>
      <Text style={styles.profileEmail}>user@example.com</Text>

      <View style={styles.profileCard}>
        <Ionicons name="person-outline" size={22} color={colors.blue} />
        <Text style={styles.profileItem}>Thông tin cá nhân</Text>
      </View>

      <View style={styles.profileCard}>
        <Ionicons name="settings-outline" size={22} color={colors.blue} />
        <Text style={styles.profileItem}>Cài đặt tài khoản</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F4F5F7",
  },
  statusText: {
    marginTop: 12,
    fontSize: 15,
    color: "#555555",
  },
  errorText: {
    color: "#C62828",
    textAlign: "center",
    fontSize: 15,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: colors.red,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
  },
  retryText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  screen: {
    flex: 1,
    backgroundColor: "#F4F5F7",
    paddingHorizontal: 14,
    paddingTop: 16,
  },
  heading: {
    fontSize: 21,
    fontWeight: "700",
    color: "#1F2430",
    marginBottom: 6,
  },
  subheading: {
    color: "#777777",
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E4E6EB",
  },
  phoneIcon: {
    width: 64,
    height: 76,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 8,
    marginRight: 12,
  },
  phoneInfo: {
    flex: 1,
  },
  phoneName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2430",
    marginBottom: 6,
  },
  phonePrice: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.red,
    marginBottom: 4,
  },
  phoneRating: {
    color: "#8A6500",
    fontSize: 12,
    marginBottom: 4,
  },
  supplier: {
    color: "#777777",
    fontSize: 12,
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8DCE3",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginTop: 10,
    marginBottom: 12,
  },
  resultText: {
    color: "#666666",
    marginBottom: 10,
  },
  emptyText: {
    textAlign: "center",
    color: "#777777",
    marginTop: 30,
    fontSize: 15,
  },
  profileScreen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F4F5F7",
    padding: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 14,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "700",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2430",
  },
  profileEmail: {
    fontSize: 14,
    color: "#777777",
    marginTop: 6,
    marginBottom: 30,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    gap: 12,
  },
  profileItem: {
    fontSize: 15,
    color: "#1F2430",
  },
});
