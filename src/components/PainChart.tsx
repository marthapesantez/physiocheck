import { StyleSheet, Text, View } from "react-native";
import type { CheckIn } from "../types/checkin";
import { formatDay } from "../utils/date";

type Props = {
  items: CheckIn[];
};

const MAX_HEIGHT = 120;

function barColor(pain: number): string {
  if (pain <= 3) return "#22c55e";
  if (pain <= 6) return "#f59e0b";
  return "#ef4444";
}

export default function PainChart({ items }: Props) {
  const data = items.slice(0, 7).reverse();
  
  if (data.length === 0) return null;
  const totalPain = data.reduce((total,i)=> total+i.pain,0);
  const averagePain = totalPain / data.length;

  const summary = data
    .map((i) => `${formatDay(i.date)}: dolor ${i.pain}`)
    .join(", ");

  return (
    <View
      style={styles.wrapper}
      accessible
      accessibilityRole="image"
      accessibilityLabel={`Gráfico de dolor de los últimos ${data.length} registros, promedio ${averagePain.toFixed(1)}. ${summary}`}
    >
      <Text style={styles.title}>Dolor reciente (promedio {averagePain.toFixed(1)})</Text>
      <View style={styles.chart}>
        {data.map((item) => (
          <View key={item.id} style={styles.column}>
            <Text style={styles.value}>{item.pain}</Text>
            <View
              style={[
                styles.bar,
                {
                  height: Math.max((item.pain / 10) * MAX_HEIGHT, 2),
                  backgroundColor: barColor(item.pain),
                },
              ]}
            />
            <Text style={styles.label}>{formatDay(item.date)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  title: { fontWeight: "600", marginBottom: 12 },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    height: MAX_HEIGHT + 40,
  },
  column: { alignItems: "center", justifyContent: "flex-end" },
  bar: { width: 22, borderRadius: 4 },
  value: { fontSize: 12, marginBottom: 4 },
  label: { fontSize: 11, color: "#666", marginTop: 4 },
});