// src/components/SummaryBar.tsx
import { StyleSheet, Text, View } from "react-native";
import type { Application } from "../schemas/applicationSchema";
import { STATUS_COLOR, STATUSES } from "../statuses";

// How many applications are in each status, and the total.
const SummaryBar = ({ applications }: { applications: Application[] }) => {
  return (
    <View style={styles.row}>
      <View style={styles.tile}>
        <Text style={styles.count}>{applications.length}</Text>
        <Text style={styles.label}>Total</Text>
      </View>
      {STATUSES.map((status) => (
        <View key={status} style={[styles.tile, styles.divider]}>
          <Text style={[styles.count, { color: STATUS_COLOR[status] }]}>
            {applications.filter((item) => item.status === status).length}
          </Text>
          <Text style={styles.label}>{status}</Text>
        </View>
      ))}
    </View>
  );
};

export default SummaryBar;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    overflow: "hidden",
  },
  tile: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
  },
  divider: {
    borderLeftWidth: 1,
    borderLeftColor: "#E5E7EB",
  },
  count: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
  },
  label: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 2,
  },
});
