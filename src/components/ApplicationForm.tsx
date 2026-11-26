import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  applicationSchema,
  ApplicationValues,
} from "../schemas/applicationSchema";
import { STATUS_COLOR, STATUSES } from "../statuses";
import Field from "./Field";

type Props = {
  defaultValues: ApplicationValues;
  submitLabel: string;
  onSave: (values: ApplicationValues) => void;
  onDelete?: () => void;
};

const ApplicationForm = ({
  defaultValues,
  submitLabel,
  onSave,
  onDelete,
}: Props) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    mode: "onTouched",
    defaultValues,
  });

  const status = watch("status");
  const offerAmount = watch("offerAmount");
  const interviewDate = watch("interviewDate");

  const showInterview = status === "Interview" || interviewDate !== "";
  const showOffer = status === "Offer" || offerAmount !== "";
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.body}
        keyboardShouldPersistTaps="handled"
      >
        <Controller
          control={control}
          name="company"
          render={({ field: { value, onChange, onBlur } }) => (
            <Field
              label="Company"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.company?.message}
              placeholder="e.g. Walmart"
            />
          )}
        />

        <Controller
          control={control}
          name="jobTitle"
          render={({ field: { value, onChange, onBlur } }) => (
            <Field
              label="Job Title"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.jobTitle?.message}
              placeholder="e.g. Software Development"
            />
          )}
        />
        <Controller
          control={control}
          name="location"
          render={({ field: { value, onChange, onBlur } }) => (
            <Field
              label="Location"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.location?.message}
              placeholder="e.g. Remote"
            />
          )}
        />
        <Controller
          control={control}
          name="dateApplied"
          render={({ field: { value, onChange, onBlur } }) => (
            <Field
              label="Date Applied"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.dateApplied?.message}
              placeholder="YYYY-MM-DD"
              maxLength={10}
            />
          )}
        />
        <View style={styles.statusBox}>
          <Text style={styles.label}>Status</Text>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <View style={styles.row}>
                {STATUSES.map((s) => (
                  <Pressable
                    key={s}
                    onPress={() => field.onChange(s)}
                    style={[
                      styles.option,
                      { borderColor: STATUS_COLOR[s] },
                      field.value === s && {
                        backgroundColor: STATUS_COLOR[s],
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color:
                            field.value === s ? "#FFFFFF" : STATUS_COLOR[s],
                        },
                      ]}
                    >
                      {s}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          />
        </View>
        {showInterview && (
          <Controller
            control={control}
            name="interviewDate"
            render={({ field: { value, onChange, onBlur } }) => (
              <Field
                label="Interview date"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.interviewDate?.message}
                placeholder="YYYY-MM-DD"
                maxLength={10}
              />
            )}
          />
        )}

        {showOffer && (
          <Controller
            control={control}
            name="offerAmount"
            render={({ field: { value, onChange, onBlur } }) => (
              <Field
                label="Offer amount"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.offerAmount?.message}
                placeholder="e.g. 100"
                keyboardType="number-pad"
              />
            )}
          />
        )}
        <Controller
          control={control}
          name="salaryMin"
          render={({ field: { value, onChange, onBlur } }) => (
            <Field
              label="Salary minimum (Optional)"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.salaryMin?.message}
              placeholder="e.g 60000"
              keyboardType="number-pad"
            />
          )}
        />

        <Controller
          control={control}
          name="salaryMax"
          render={({ field: { value, onChange, onBlur } }) => (
            <Field
              label="Salary maximum (Optional)"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.salaryMax?.message}
              placeholder="e.g 75000"
              keyboardType="number-pad"
            />
          )}
        />
        <Controller
          control={control}
          name="contactEmail"
          render={({ field: { value, onChange, onBlur } }) => (
            <Field
              label="Contact email (Optional)"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.contactEmail?.message}
              placeholder="company@job.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          )}
        />
        <Controller
          control={control}
          name="notes"
          render={({ field: { value, onChange, onBlur } }) => (
            <Field
              label="Notes (Optional)"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.notes?.message}
              placeholder="Who was the interviewer? Any follow-up questions?"
              multiline
            />
          )}
        />

        <Pressable
          style={[styles.button, !isValid && styles.buttonOff]}
          disabled={!isValid}
          onPress={() => handleSubmit(onSave)()}
        >
          <Text style={styles.buttonText}>{submitLabel}</Text>
        </Pressable>
        {onDelete && (
          <Pressable style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.deleteText}>Delete Application</Text>
          </Pressable>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ApplicationForm;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  body: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },

  statusBox: {
    gap: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  option: {
    borderWidth: 1.5,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  optionText: {
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#5E7A52",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonOff: {
    backgroundColor: "#CBD5E1",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  deleteButton: {
    borderColor: "#DC2626",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  deleteText: {
    color: "#DC2626",
    fontSize: 16,
    fontWeight: "700",
  },
});
