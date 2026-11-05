import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function CheckIn() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>CheckIn</Text>
      <Button title="Navigate" onPress={()=>router.push("/history")} />
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
