import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  value: number;
  selected: boolean;
  onPress: (value: number) => void;
  labelPrefix: string;
};

export default function PainButton({ value, selected, onPress, labelPrefix }: Props) {
  return (
    <Pressable
      onPress={() => onPress(value)}
      style={[styles.button, selected && styles.selected]}
      accessibilityRole="button"
      accessibilityLabel={`${labelPrefix} ${value}`}
      accessibilityState={{selected}}
    >
      <Text style={selected ? styles.textSelected : styles.text}>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#888",
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },
  selected: { backgroundColor: "#2563eb", borderColor: "#2563eb" },
  text: { color: "#333" },
  textSelected: { color: "#fff", fontWeight: "bold" },
});