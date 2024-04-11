import { v4 as uuidv4 } from "uuid";
import { IWizard, IWizardPage } from "./../utils/types";
import { create } from "zustand";

type WizardStore = {
  wizard: IWizard;
  addPage: (page: IWizardPage) => void;
  removePage: (page: IWizardPage) => void;
  addWizard: () => void;
  startPage: () => void;
};

export const useWizardStore = create<WizardStore>((set) => {
  return {
    wizard: {} as IWizard,
    addPage: (page) =>
      set((state) => ({
        wizard: {
          ...state.wizard,
          pages: state.wizard.pages && [...state.wizard.pages, page],
        },
      })),
    removePage: (page) =>
      set((state) => ({
        wizard: {
          ...state.wizard,
          pages:
            state.wizard.pages &&
            state.wizard.pages.filter((value) => value.id !== page.id),
        },
      })),
    addWizard: () =>
      set((state) => ({
        wizard: { orientation: "", pages: undefined },
      })),
    startPage: () =>
      set((state) => ({
        wizard: {
          ...state.wizard,
          pages: state.wizard.pages
            ? [
                ...state.wizard.pages,
                {
                  components: [],
                  title: "",
                  id: String(uuidv4()),
                },
              ]
            : [
                {
                  components: [],
                  title: "",
                  id: String(uuidv4()),
                },
              ],
        },
      })),
  };
});
