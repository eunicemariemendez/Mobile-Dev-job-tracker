// src/components/ApplicationCard.tsx
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Application } from "../schemas/applicationSchema";
import { STATUS_COLOR, STATUS_SOFT } from "../statuses";

type Props = {
  application: Application;
  onPress: () => void;
};

const ApplicationCard = ({ application, onPress }: Props) => {
  const { company, jobTitle, status, dateApplied } = application;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.top}>
        <Text style={styles.company}>{company}</Text>
        <View style={[styles.pill, { backgroundColor: STATUS_SOFT[status] }]}>
          <Text style={[styles.pillText, { color: STATUS_COLOR[status] }]}>
            {status}
          </Text>
        </View>
      </View>
      <Text style={styles.jobTitle}>{jobTitle}</Text>
      <Text style={styles.date}>Applied {dateApplied}</Text>
    </Pressable>
  );
};

export default ApplicationCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 14,
    gap: 4,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  company: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pillText: {
    fontSize: 12,
    fontWeight: "700",
  },
  jobTitle: {
    fontSize: 15,
    color: "#374151",
  },
  date: {
    fontSize: 13,
    color: "#6B7280",
  },
});
