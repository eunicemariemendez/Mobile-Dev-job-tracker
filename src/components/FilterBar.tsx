// src/components/FilterBar.tsx
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Status, STATUS_COLOR, STATUS_SOFT, STATUSES } from "../statuses";

export type Filter = "All" | Status;

const FILTERS: Filter[] = ["All", ...STATUSES];

type Props = {
  value: Filter;
  onChange: (next: Filter) => void;
};

const FilterBar = ({ value, onChange }: Props) => {
  return (
    <View style={styles.row}>
      {FILTERS.map((filter) => {
        const soft = filter === "All" ? "#DCE8D5" : STATUS_SOFT[filter];
        const color = filter === "All" ? "#2F4A28" : STATUS_COLOR[filter];
        const selected = value === filter;
        return (
          <Pressable
            key={filter}
            onPress={() => onChange(filter)}
            style={[styles.button, selected && { backgroundColor: soft }]}
          >
            <Text style={[styles.text, selected && { color }]}>{filter}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 4,
  },
  button: {
    flex: 1,
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 10,
  },
  text: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
  },
});
