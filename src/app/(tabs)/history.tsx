import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import CheckInCard from "../../components/CheckInCard";
import PainChart from "../../components/PainChart";
import { useCheckIns } from "../../hooks/useCheckIns";

export default function History() {
  const {items, loading, error, reload, clear, seed} = useCheckIns();

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (error){
    return (
      <View style ={ styles.center}>
        <Text style= {styles.error}>{error }</Text>
        <Button title="Reintentar" onPress={reload}/>
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
            <Button title="Cargar datos de prueba" onPress={seed} />
            <Button title="Borrar todo" onPress={clear} />
          </View>
        ) : null
      }
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  empty: { textAlign: "center", marginTop: 32, color: "#666" },
  error: {color: "#b91c1c"},
  dev: { marginTop: 16, gap: 8 },
});