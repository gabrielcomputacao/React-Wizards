import { create } from "zustand";

interface loaderStore {
  loader: boolean;
  loaderTrue: () => void;
  loaderFalse: () => void;
}

export const useLoaderStore = create<loaderStore>((set) => {
  return {
    loader: true,
    loaderTrue: () =>
      set((state) => ({
        loader: true,
      })),
    loaderFalse: () =>
      set((state) => ({
        loader: false,
      })),
  };
});
