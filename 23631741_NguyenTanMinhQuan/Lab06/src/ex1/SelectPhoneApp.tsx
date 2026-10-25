import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { Phone, SelectPhoneStackParamList } from "../types";
import { ProductScreen } from "./ProductScreen";
import { ChooseColorScreen } from "./ChooseColorScreen";

const Stack =
  createNativeStackNavigator<SelectPhoneStackParamList>();

type Props = {
  phone: Phone;
};

export function SelectPhoneApp({ phone }: Props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Product"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Product">
          {(props) => (
            <ProductScreen {...props} phone={phone} />
          )}
        </Stack.Screen>

        <Stack.Screen name="ChooseColor">
          {(props) => (
            <ChooseColorScreen {...props} phone={phone} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}