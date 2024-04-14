import { IWizard } from "@/utils/types";
import { create } from "zustand";

type IListWizardStore = {
  listWizards: Array<IWizard>;
  addWizardInList: (wizard: IWizard) => void;
  removeWizard: (id: string) => void;
};

export const useListWizardStore = create<IListWizardStore>((set) => {
  return {
    listWizards: [] as Array<IWizard>,
    addWizardInList: (wizard) =>
      set((state) => ({
        listWizards: [...state.listWizards, wizard],
      })),
    removeWizard: (id: string) =>
      set((state) => ({
        listWizards: state.listWizards.filter((wizard) => wizard.id !== id),
      })),
  };
});
