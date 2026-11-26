import { router } from "expo-router";
import ApplicationForm from "../components/ApplicationForm";
import { useApplications } from "../context/ApplicationsContext";
import { emptyApplication } from "../schemas/applicationSchema";

const NewApplication = () => {
  const { addApplication } = useApplications();

  return (
    <ApplicationForm
      defaultValues={emptyApplication}
      submitLabel="Save Application"
      onSave={(values) => {
        addApplication(values);
        router.back();
      }}
    />
  );
};

export default NewApplication;
