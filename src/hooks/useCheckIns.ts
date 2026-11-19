import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { clearCheckIns, getCheckIns, seedCheckIns } from "../storage/checkins";
import type { CheckIn } from "../types/checkin";
export function useCheckIns(){
    const [items, setItems] = useState<CheckIn[]>([]);
    const [loading, setLoading]= useState(true);
    const [error, setError]= useState<string | null>(null);

    const reload = useCallback(async()=>{
        try{
            setError(null);
            const data = await getCheckIns();
            setItems(data);
        }catch(e){
            console.error(e);
            setError("No se pudieron cargar los registros.");
        }finally{
            setLoading(false);
        }
    }, []);
    useFocusEffect(
        useCallback(()=>{
            reload();
        }, [reload]),
    );

    const clear = useCallback(async () =>{
        await clearCheckIns();
        await reload();
    }, [reload]);

    const seed = useCallback(async()=>{
        await seedCheckIns();
        await reload();
    },[reload]);
    return {items, loading, error, reload, clear,seed};
}