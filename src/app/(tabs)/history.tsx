import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { clearCheckIns, getCheckIns } from "../../storage/checkins";
import type { CheckIn } from "../../types/checkin";

export default function History() {
  const [items, setItems] = useState<CheckIn[]>([]);
  const [loading, setLoading]= useState(true);

  const load = useCallback(()=>{
    getCheckIns().then(setItems)
      .catch((error)=> console.error(error))
      .finally(()=> setLoading(false))
  }, []);

  useFocusEffect(load);

  const handleClear= async ()=>{
    await clearCheckIns();
    setItems([]);
  };
  
  if (loading){
    return (
    <View style={styles.center}>
    <Text>Cargando...</Text>
  </View>
);
}
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text styles={styles.title}>Registros: {items.length}</Text>
      {items.map((item)=>(
        <View key={item.id} style={styles.card}>
          <Text style={styles.date}>
            {new Date(item.date).toLocaleString()}
          </Text>
          <Text>
            Dolor: {item.pain} | Energía: {item.energy} | Ánimo: {item.mood}
          </Text>
          <Text>
            Zonas: {item.zones.length>0? item.zones.join(","): "ninguna"} 
          </Text>
          {item.notes? <Text>
            Notas : {item.notes}
          </Text>: null}
        </View>
      ))}
      <Button title= "Borrar todo(solo pruebas)" onPress={handleClear}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      padding: 16
    },
    center:{
      flex: 1, alignItems: "center",
      justifyContent: "center"
    },
    title:{
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 12
    },
    card: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      padding: 12,
      marginBottom: 10,
    },
    date: {
      fontWeight: "600",
      marginBottom: 4
    },
  });
    
