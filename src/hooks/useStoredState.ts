import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const useStoredState = <T>(key: string, initial: T) => {
  const [value, setValue] = useState<T>(initial);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem(key);
        if (saved !== null) {
          setValue(JSON.parse(saved));
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [key]);

  const save = async (next: T) => {
    setValue(next);
    await AsyncStorage.setItem(key, JSON.stringify(next));
  };

  return { value, save, loading };
};

export default useStoredState;
