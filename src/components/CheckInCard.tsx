import { StyleSheet, Text, View } from "react-native";
import type { CheckIn } from "../types/checkin";
import { formatDateTime } from "../utils/date";

type Props = {
  item: CheckIn;
};

export default function CheckInCard({ item }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.date}>{formatDateTime(item.date)}</Text>
      <Text>
        Dolor: {item.pain} | Energía: {item.energy} | Ánimo: {item.mood}
      </Text>
      <Text>
        Zonas: {item.zones.length > 0 ? item.zones.join(", ") : "ninguna"}
      </Text>
      {item.notes ? <Text>Notas: {item.notes}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  date: { fontWeight: "600", marginBottom: 4 },
});