import { createContext, useContext, type ReactNode } from "react";
import useStoredState from "../hooks/useStoredState";
import type {
  Application,
  ApplicationValues,
} from "../schemas/applicationSchema";

type ApplicationsValue = {
  applications: Application[];
  addApplication: (values: ApplicationValues) => void;
  updateApplication: (id: string, values: ApplicationValues) => void;
  removeApplication: (id: string) => void;
};

const ApplicationContext = createContext<ApplicationsValue | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

const ApplicationsProvider = ({ children }: Props) => {
  const { value: applications, save } = useStoredState<Application[]>(
    "applications",
    [],
  );

  const addApplication = (values: ApplicationValues) => {
    const id = Date.now().toString();
    save([...applications, { ...values, id }]);
  };

  const updateApplication = (id: string, values: ApplicationValues) => {
    save(
      applications.map((item) => (item.id === id ? { ...values, id } : item)),
    );
  };

  const removeApplication = (id: string) => {
    save(applications.filter((item) => item.id !== id));
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        addApplication,
        updateApplication,
        removeApplication,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = (): ApplicationsValue => {
  const value = useContext(ApplicationContext);
  if (value === undefined) {
    throw new Error(
      "useApplications was called outside an ApplicationProvider",
    );
  }
  return value;
};

export default ApplicationsProvider;
