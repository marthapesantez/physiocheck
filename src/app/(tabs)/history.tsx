import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function History() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Historial</Text>
      <Button title="Navigate" onPress={()=>router.push("/settings")} />
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
    
