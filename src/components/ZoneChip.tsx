import { Pressable, StyleSheet, Text } from "react-native";

type Props ={
    label: string;
    selected: boolean;
    onPress: (label: string) => void;
};

export default function ZoneChip({label, selected, onPress}: Props){
    return (
        <Pressable
        onPress={() => onPress(label)}
        style = {[styles.chip, selected && styles.selected]}
        accessibilityRole ="checkbox"
        accessibilityLabel = {label}
        accessibilityState= {{ checked: selected }}
        >
            <Text style={selected ? styles.textSelected : StyleSheet.text}>
                {label}
            </Text>
        </Pressable>
    );
}

const styles=StyleSheet.create({
    chip:{
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#888",
        margin: 4,
    },
    selected:{
        brackgroundColor: "#2563eb",
        borderColor: "#2563eb"
    },
    text:{
        color: "#333"
    },
    textSelected:{
        color:"#fff",
        fontWeight: "bold"
    },
});