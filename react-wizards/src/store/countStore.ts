import { create } from "zustand";

interface countStore {
  countIndexPages: number;
  plusCount: () => void;
  setCountIndex: (index: number) => void;
}

export const useCountStore = create<countStore>((set) => {
  return {
    countIndexPages: -1,
    plusCount: () =>
      set((state) => ({
        countIndexPages: state.countIndexPages + 1,
      })),
    setCountIndex: (index: number) =>
      set((state) => ({
        countIndexPages: index,
      })),
  };
});
