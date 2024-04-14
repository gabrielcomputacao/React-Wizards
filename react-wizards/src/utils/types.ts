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
  id: string;
  orientation: OrientacaoEnum;
  pages: Array<IWizardPage> | undefined;
}

export interface IListWizard {
  id: string;
  wizards: Array<IWizard>;
}

export interface IMessageError {
  messageError: string;
  type: "orientation" | "text" | "title" | "";
  isOpen: boolean;
}
