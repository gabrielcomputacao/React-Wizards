export interface IListComponente {
  componente: "label" | "input" | "button" | "textarea";
  text: string | undefined;
}

export interface IWizardPage {
  id: string;
  title: string;
  components: Array<IListComponente>;
}

export interface IWizard {
  orientation: "vertical" | "horizontal" | "";
  pages: Array<IWizardPage> | undefined;
}

export interface IListWizard {
  wizards: Array<IWizard>;
}
