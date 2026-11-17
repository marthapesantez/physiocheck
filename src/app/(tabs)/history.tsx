import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import CheckInCard from "../../components/CheckInCard";
import PainChart from "../../components/PainChart";
import {
  clearCheckIns,
  getCheckIns,
  seedCheckIns
} from "../../storage/checkins";
import type { CheckIn } from "../../types/checkin";

export default function History() {
  const [items, setItems] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    getCheckIns()
      .then(setItems)
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(load);

  const handleClear = async () => {
    await clearCheckIns();
    setItems([]);
  };

  const handleSeed = async () => {
    await seedCheckIns();
    load();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CheckInCard item={item} />}
      ListHeaderComponent={<PainChart items={items} />}
      ListEmptyComponent={
        <Text style={styles.empty}>
          Aún no hay registros. Guarda tu primer check-in.
        </Text>
      }
      ListFooterComponent={
        __DEV__ ? (
          <View style={styles.dev}>
            <Button title="Cargar datos de prueba" onPress={handleSeed} />
            <Button title="Borrar todo" onPress={handleClear} />
          </View>
        ) : null
      }
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  empty: { textAlign: "center", marginTop: 32, color: "#666" },
  dev: { marginTop: 16, gap: 8 },
});