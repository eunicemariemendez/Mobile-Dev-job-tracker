import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import ApplicationCard from "../components/ApplicationCard";
import FilterBar, { Filter } from "../components/FilterBar";
import SummaryBar from "../components/SummaryBar";
import { useApplications } from "../context/ApplicationsContext";

const ApplicationsList = () => {
  const { applications } = useApplications();
  const [filter, setFilter] = useState<Filter>("All");

  const sorted = [...applications].sort(
    (a, b) =>
      b.dateApplied.localeCompare(a.dateApplied) || Number(b.id) - Number(a.id),
  );
  const shown =
    filter === "All" ? sorted : sorted.filter((item) => item.status === filter);

  const emptyMessage =
    applications.length === 0
      ? 'Tap "Add Application" above to record the first job you\'ve applied for.'
      : `None of your applications are at ${filter} right now.
  Choose All to see every Application.`;

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.list}
      data={shown}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.gap} />}
      ListHeaderComponent={
        <View style={styles.header}>
          <SummaryBar applications={applications} />
          <FilterBar value={filter} onChange={setFilter} />
          <Pressable
            style={styles.addButton}
            onPress={() => router.push("/new")}
          >
            <Text style={styles.addText}>Add Application</Text>
          </Pressable>
        </View>
      }
      ListEmptyComponent={<Text style={styles.empty}>{emptyMessage}</Text>}
      renderItem={({ item }) => (
        <ApplicationCard
          application={item}
          onPress={() =>
            router.push({ pathname: "/edit/[id]", params: { id: item.id } })
          }
        />
      )}
    />
  );
};

export default ApplicationsList;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  list: {
    padding: 16,
  },
  header: {
    gap: 14,
    marginBottom: 14,
  },
  gap: {
    height: 10,
  },
  addButton: {
    backgroundColor: "#5E7A52",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  addText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  empty: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 21,
    paddingVertical: 32,
  },
});
