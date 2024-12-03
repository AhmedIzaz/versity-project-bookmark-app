import { create } from "zustand";
import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";
import authStore, { TAuthStore } from "./authStore";

type TMainStore = {} & TAuthStore;

const config: PersistOptions<TMainStore> = {
  name: "Bookmark",
  storage: createJSONStorage(() => sessionStorage),
};
const useStore = create<TMainStore>()(
  persist(
    (...set) => ({
      ...authStore(...set),
    }),
    config
  )
);

export default useStore;
