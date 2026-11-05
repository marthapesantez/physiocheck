import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
export default function TabsLayout() {
  return (
  <Tabs>
   <Tabs.Screen name="index" options={{
       title: "CheckIn",
       tabBarIcon: ({ color, size }) => (
        <Ionicons name="heart-outline" size={size} color={color} />
      ),
       }}/>
   <Tabs.Screen name="history" options={{
       title: "Historial",
       tabBarIcon: ({ color, size }) => (
        <Ionicons name="stats-chart-outline" size={size} color={color} />
      ),
}}/>
   <Tabs.Screen name="settings" options={{
       title: "Ajustes",
       tabBarIcon: ({ color, size }) => (
        <Ionicons name="settings-outline" size={size} color={color} />
      ),}}/>
  </Tabs>);
}
