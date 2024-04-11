import { create } from "zustand";

interface countStore {
  countIndexPages: number;
  plusCount: () => void;
  lessCount: () => void;
}

export const useCountStore = create<countStore>((set) => {
  return {
    countIndexPages: 0,
    plusCount: () =>
      set((state) => ({
        countIndexPages: state.countIndexPages++,
      })),
    lessCount: () =>
      set((state) => ({
        countIndexPages: state.countIndexPages--,
      })),
  };
});
