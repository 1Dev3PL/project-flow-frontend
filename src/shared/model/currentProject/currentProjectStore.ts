import { create } from "zustand/react";
import { createJSONStorage, persist } from "zustand/middleware";

type CurrentProjectStore = {
  currentProjectId: string | null;
  setCurrentProjectId: (projectId: string) => void;
  removeCurrentProjectId: () => void;
};

export const useCurrentProjectStore = create<CurrentProjectStore>()(
  persist(
    (set) => ({
      currentProjectId: null,
      setCurrentProjectId: (projectId: string) => {
        set(() => ({ currentProjectId: projectId }));
      },
      removeCurrentProjectId: () => {
        set(() => ({ currentProjectId: null }));
      },
    }),
    {
      name: "currentProjectStore",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
