import AsyncStorage from "@react-native-async-storage/async-storage";
import type { CheckIn } from "../types/checkin";

const KEY= "checkins";
export async function getCheckIns(): Promise<CheckIn[]>{
    const raw = await AsyncStorage.getItem(KEY);
    return raw? (JSON.parse(raw) as CheckIn[]) : [];
}

export async function saveCheckIn(checkIn: CheckIn): Promise<void>{
    const current = await getCheckIns();
    const updated = [checkIn, ...current];
    await AsyncStorage.setItem(KEY, JSON.stringify(updated));
}

export async function clearCheckIns(): Promise<void>{
    await AsyncStorage.removeItem(KEY);
}

export async function seedCheckIns(): Promise<void> {
    const zonesPool = ["Cuello", "Espalda baja", "Rodilla", "Hombro"];
    const now = Date.now();
    const samples: CheckIn[] = Array.from({ length: 10 }, (_, i) => ({
      id: `seed-${now}-${i}`,
      date: new Date(now - i * 24 * 60 * 60 * 1000).toISOString(),
      pain: Math.floor(Math.random() * 11),
      zones: [zonesPool[i % zonesPool.length]],
      energy: 1 + Math.floor(Math.random() * 5),
      mood: 1 + Math.floor(Math.random() * 5),
      notes: "",
    }));
    const current = await getCheckIns();
    const all = [...samples, ...current].sort((a, b) =>
      b.date.localeCompare(a.date)
    );
    await AsyncStorage.setItem(KEY, JSON.stringify(all));
  }

