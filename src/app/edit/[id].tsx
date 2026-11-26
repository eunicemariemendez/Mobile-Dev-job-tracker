import { router, useLocalSearchParams } from "expo-router";
import { Alert } from "react-native";
import ApplicationForm from "../../components/ApplicationForm";
import { useApplications } from "../../context/ApplicationsContext";

const EditApplication = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { applications, updateApplication, removeApplication } =
    useApplications();

  const application = applications.find((item) => item.id === id);

  if (!application) {
    return null;
  }

  const deleteApplication = () => {
    Alert.alert("Delete application?", " This cannot be undone", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          removeApplication(application.id);
          router.back();
        },
      },
    ]);
  };

  const { id: _id, ...values } = application;
  return (
    <ApplicationForm
      defaultValues={values}
      submitLabel="Save Changes"
      onSave={(updated) => {
        updateApplication(application.id, updated);
        router.back();
      }}
      onDelete={deleteApplication}
    />
  );
};

export default EditApplication;
