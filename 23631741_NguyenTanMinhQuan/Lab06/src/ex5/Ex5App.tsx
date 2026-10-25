
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  type DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../theme";

type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export function Ex5App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerTintColor: colors.blue,
          drawerActiveTintColor: colors.red,
          drawerInactiveTintColor: "#555555",
          drawerLabelStyle: {
            fontSize: 15,
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={DrawerHomeScreen}
          options={{
            title: "Trang chủ",
            drawerLabel: "Home",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          }}
        />

        <Drawer.Screen
          name="Profile"
          component={DrawerProfileScreen}
          options={{
            title: "Thông tin cá nhân",
            drawerLabel: "Profile",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-outline" color={color} size={size} />
            ),
          }}
        />

        <Drawer.Screen
          name="Settings"
          component={DrawerSettingsScreen}
          options={{
            title: "Cài đặt",
            drawerLabel: "Settings",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// Phần đầu của ngăn Drawer.
function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <View style={styles.smallAvatar}>
          <Ionicons name="person" size={32} color="#FFFFFF" />
        </View>
        <Text style={styles.drawerName}>Lab 06</Text>
        <Text style={styles.drawerSubtitle}>Navigation Demo</Text>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

// BÀI 5 - HOME
function DrawerHomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.homeIcon}>
        <Ionicons name="home-outline" size={60} color={colors.blue} />
      </View>

      <Text style={styles.heading}>Chào mừng!</Text>
      <Text style={styles.description}>
        Đây là màn hình Home của bài Drawer Navigation.
      </Text>
      <Text style={styles.hint}>
        Mở menu bên trái để chuyển sang Profile hoặc Settings.
      </Text>
    </SafeAreaView>
  );
}

// BÀI 5 - PROFILE
function DrawerProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.profileScreen}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>U</Text>
      </View>

      <Text style={styles.profileName}>Người dùng</Text>
      <Text style={styles.profileEmail}>user@example.com</Text>

      <View style={styles.infoCard}>
        <Ionicons name="person-outline" size={22} color={colors.blue} />
        <View style={styles.infoText}>
          <Text style={styles.infoLabel}>Họ và tên</Text>
          <Text style={styles.infoValue}>Người dùng</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="mail-outline" size={22} color={colors.blue} />
        <View style={styles.infoText}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>user@example.com</Text>
        </View>
      </View>
    </ScrollView>
  );
}

// BÀI 5 - SETTINGS: hai Switch có trạng thái.
function DrawerSettingsScreen() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);

  const pageBackground = dark ? "#171923" : "#F4F5F7";
  const cardBackground = dark ? "#272A35" : "#FFFFFF";
  const textColor = dark ? "#FFFFFF" : "#1F2430";
  const secondaryColor = dark ? "#C2C5D0" : "#666666";

  return (
    <ScrollView
      style={[styles.settingsScreen, { backgroundColor: pageBackground }]}
      contentContainerStyle={styles.settingsContent}
    >
      <Text style={[styles.heading, { color: textColor }]}>
        Cài đặt ứng dụng
      </Text>
      <Text style={[styles.description, { color: secondaryColor }]}>
        Bật hoặc tắt các tùy chọn bên dưới.
      </Text>

      <View style={[styles.settingRow, { backgroundColor: cardBackground }]}>
        <View style={styles.settingIcon}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={colors.blue}
          />
        </View>

        <View style={styles.settingInfo}>
          <Text style={[styles.settingTitle, { color: textColor }]}>
            Thông báo
          </Text>
          <Text style={[styles.settingDescription, { color: secondaryColor }]}>
            Nhận thông báo từ ứng dụng
          </Text>
        </View>

        <Switch
          value={notify}
          onValueChange={setNotify}
          trackColor={{ false: "#B8BEC8", true: colors.blue }}
        />
      </View>

      <View style={[styles.settingRow, { backgroundColor: cardBackground }]}>
        <View style={styles.settingIcon}>
          <Ionicons
            name="moon-outline"
            size={24}
            color={colors.blue}
          />
        </View>

        <View style={styles.settingInfo}>
          <Text style={[styles.settingTitle, { color: textColor }]}>
            Chế độ tối
          </Text>
          <Text style={[styles.settingDescription, { color: secondaryColor }]}>
            Đổi màu nền màn hình cài đặt
          </Text>
        </View>

        <Switch
          value={dark}
          onValueChange={setDark}
          trackColor={{ false: "#B8BEC8", true: colors.blue }}
        />
      </View>

      <View style={[styles.statusCard, { backgroundColor: cardBackground }]}>
        <Text style={[styles.statusTitle, { color: textColor }]}>
          Trạng thái hiện tại
        </Text>
        <Text style={[styles.statusLine, { color: secondaryColor }]}>
          Thông báo: {notify ? "Đang bật" : "Đang tắt"}
        </Text>
        <Text style={[styles.statusLine, { color: secondaryColor }]}>
          Chế độ tối: {dark ? "Đang bật" : "Đang tắt"}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: "#EEF2FF",
    padding: 22,
    marginBottom: 10,
    alignItems: "flex-start",
  },
  smallAvatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  drawerName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#172554",
  },
  drawerSubtitle: {
    fontSize: 13,
    color: "#555555",
    marginTop: 4,
  },
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F4F5F7",
  },
  homeIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5EAFE",
    marginBottom: 24,
  },
  heading: {
    fontSize: 23,
    fontWeight: "700",
    color: "#1F2430",
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    color: "#666666",
    textAlign: "center",
    marginBottom: 12,
  },
  hint: {
    fontSize: 13,
    color: "#777777",
    textAlign: "center",
    lineHeight: 20,
  },
  profileScreen: {
    flexGrow: 1,
    backgroundColor: "#F4F5F7",
    alignItems: "center",
    padding: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
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
    marginBottom: 28,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    color: "#777777",
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    color: "#1F2430",
    fontSize: 15,
    fontWeight: "600",
  },
  settingsScreen: {
    flex: 1,
  },
  settingsContent: {
    padding: 18,
    paddingBottom: 30,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 14,
    marginTop: 14,
  },
  settingIcon: {
    width: 42,
    alignItems: "center",
    marginRight: 10,
  },
  settingInfo: {
    flex: 1,
    paddingRight: 8,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 5,
  },
  settingDescription: {
    fontSize: 12,
    lineHeight: 18,
  },
  statusCard: {
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
  },
  statusTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
  },
  statusLine: {
    fontSize: 14,
    marginTop: 5,
  },
});
