import { useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, View } from "react-native";
import PainButton from "../../components/PainButton";
import ZoneChip from "../../components/ZoneChip";
import type { CheckIn as CheckInType } from "../../types/checkin";

const ZONES =["Cuello", "Hombro", "Espalda alta","Espalda baja","Codo", "Muñeca","Cadera", "Rodillo", "Tobillo", "Otra"]

export default function CheckIn() {
  const [pain, setPain] = useState<number | null>(null);
  const [zones, setZones] = useState<string[]>([]);
  const [energy,setEnergy] = useState<number | null>(null);
  const [mood,setMood] = useState<number | null>(null);

  const toggleZone =(zone:string)=>{
    setZones((prev) =>
      prev.includes(zone) ? prev.filter((z)=> z!==zone) : [...prev,zone]
    );
  };

  const canSave = pain !==null && energy !== null  && mood !==null;
  
  const handleSave = () =>{
    if (!canSave) return;
    const checkIn: CheckInType ={
      id: Date.now().toString(),
      date: new Date().toISOString(),
      pain,
      zones,
      energy,
      mood,
    };
    console.log(checkIn);
    Alert.alert("Check-in guardado");
    setPain(null);
    setZones([]);
    setEnergy(null);
    setMood(null);

  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>¿Cuánto dolor sientes hoy? (0-10)</Text>
      <View style={styles.row}>
        {Array.from({ length: 11 }, (_, i) => (
          <PainButton
            key={i}
            value={i}
            selected={pain === i}
            onPress={setPain}
            labelPrefix ="Dolor nivel"
          />
        ))}
      </View>
      <Text style={styles.title}>¿Dónde lo sientes? </Text>
      <View style={styles.row}>
        {ZONES.map((z)=>(
            <ZoneChip key={z} label={z} 
            selected={zones.includes(z)}
            onPress ={toggleZone}
            />
        ))}
      </View>
      <Text style={styles.title}>Energía (1-5)</Text>
      <View style={styles.row}>
        {[1,2,3,4,5].map((n)=>(
            <PainButton key={n}  value = {n} selected={energy=== n}
            onPress={setEnergy} labelPrefix="Nivel de Energía"
            />
        ))}
      </View>
      <Text style={styles.title}>Ánimo (1-5)</Text>
      <View style={styles.row}>
        {[1,2,3,4,5].map((n)=>(
            <PainButton key={n}  value = {n} selected={mood=== n}
            onPress={setMood} labelPrefix="Nivel de Ánimo"
            />
        ))}
      </View>
      
      <Button 
      title="Guardar"
      onPress = {handleSave}
      disabled={!canSave}
      ></Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {  
    padding: 16, 
    paddingBottom: 48 
  },
  title: { 
    fontSize: 16,
    fontWeight:"600",
    marginTop: 16,
    marginBottom: 8
  },
  row: { 
    flexDirection: "row", 
    flexWrap: "wrap",
   },
});