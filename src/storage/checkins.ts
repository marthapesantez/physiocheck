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