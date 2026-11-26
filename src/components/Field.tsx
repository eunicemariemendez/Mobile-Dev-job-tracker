import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type Props = TextInputProps & {
  label: string;
  error?: string;
};

const Field = ({ label, error, ...inputProps }: Props) => {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        {...inputProps}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default Field;

const styles = StyleSheet.create({
  field: {
    gap: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
  },
  inputError: {
    borderColor: "#DC2626",
    borderWidth: 2,
    backgroundColor: "#FEF2F2",
  },
  error: {
    fontSize: 13,
    color: "#DC2626",
  },
});
