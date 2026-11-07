import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PainButton from "../../components/PainButton";

export default function CheckIn() {
  const [pain, setPain] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Cuánto dolor sientes hoy?</Text>
      <View style={styles.row}>
        {Array.from({ length: 11 }, (_, i) => (
          <PainButton
            key={i}
            value={i}
            selected={pain === i}
            onPress={setPain}
          />
        ))}
      </View>
      <Text>
        {pain === null ? "Elige un nivel" : `Nivel seleccionado: ${pain}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
  title: { fontSize: 18, marginBottom: 16 },
  row: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginBottom: 16 },
});