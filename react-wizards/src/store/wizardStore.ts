import { v4 as uuidv4 } from "uuid";
import {
  IComponent,
  IWizard,
  IWizardPage,
  OrientacaoEnum,
} from "./../utils/types";
import { create } from "zustand";

type WizardStore = {
  wizard: IWizard;
  addPage: (page: IWizardPage) => void;
  removePage: (page: IWizardPage) => void;
  addWizard: () => void;
  startPage: () => void;
  addOrientation: (value: OrientacaoEnum) => void;
  setTitlePage: (text: string, index: number) => void;
  addPageComponent: (newComponent: IComponent, index: number) => void;
  removePageComponent: (idValue: string, index: number) => void;
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
        wizard: { orientation: OrientacaoEnum.VAZIO, pages: undefined },
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
    addOrientation: (orientation: OrientacaoEnum) =>
      set((state) => ({
        wizard: {
          ...state.wizard,
          orientation: orientation,
        },
      })),
    setTitlePage: (text: string, index: number) =>
      set((state) => ({
        wizard: {
          ...state.wizard,
          pages: state.wizard.pages!.map((page, i) => {
            if (i === index) {
              return { ...page, title: text };
            } else {
              return page;
            }
          }),
        },
      })),
    addPageComponent: (newComponent: IComponent, index: number) =>
      set((state) => ({
        wizard: {
          ...state.wizard,
          pages: state.wizard.pages!.map((page, i) => {
            if (i === index) {
              return {
                ...page,
                components: [...page.components, newComponent],
              };
            } else {
              return page;
            }
          }),
        },
      })),
    removePageComponent: (idValue: string, index: number) =>
      set((state) => ({
        wizard: {
          ...state.wizard,
          pages: state.wizard.pages!.map((page, i) => {
            if (i === index) {
              return {
                ...page,
                components: page.components.filter(
                  (idPage) => idPage.id !== idValue
                ),
              };
            } else {
              return page;
            }
          }),
        },
      })),
  };
});
