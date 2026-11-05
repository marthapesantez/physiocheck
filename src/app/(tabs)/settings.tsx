import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Settings() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Ajustes</Text>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });
    
