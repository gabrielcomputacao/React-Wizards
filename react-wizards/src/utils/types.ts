export interface IComponent {
  typeComponent: "label" | "input" | "button" | "textarea";
  text: string | undefined;
  id: string;
}

export enum OrientacaoEnum {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
  VAZIO = "",
}

export interface IWizardPage {
  id: string;
  title: string;
  components: Array<IComponent>;
}

export interface IWizard {
  orientation: OrientacaoEnum;
  pages: Array<IWizardPage> | undefined;
}

export interface IListWizard {
  wizards: Array<IWizard>;
}

export interface IMessageError {
  messageError: string;
  type: "orientation" | "text" | "";
  isOpen: boolean;
}
