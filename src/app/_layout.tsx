import { Stack } from "expo-router";
import ApplicationProvider from "../context/ApplicationsContext";

const RootLayout = () => {
  return (
    <ApplicationProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Job Applications" }} />
        <Stack.Screen name="new" options={{ title: "Add Application" }} />
        <Stack.Screen
          name="edit/[id]"
          options={{ title: "Edit Application" }}
        />
      </Stack>
    </ApplicationProvider>
  );
};

export default RootLayout;
