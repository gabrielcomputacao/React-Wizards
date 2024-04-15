import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
  Table,
} from "../ui/table";
import { Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  IComponent,
  IMessageError,
  IWizard,
  OrientacaoEnum,
} from "@/utils/types";
import { useWizardStore } from "@/store/wizardStore";
import { useCountStore } from "@/store/countStore";
import { handleOnValueChangeOrientation, isNotEmpty } from "@/utils/functions";
import { useListWizardStore } from "@/store/listWizardStore";
import { useLoaderStore } from "@/store/loaderStore";

export function SettingsWizardCreator() {
  const [isCreatingWizard, setIsCreatingWizard] = useState(false);
  const [isCreatingPage, setIsCreatingPage] = useState(false);
  const [component, setComponent] = useState<IComponent>({} as IComponent);
  const [messageError, setMessageError] = useState<IMessageError>({
    isOpen: false,
    messageError: "",
    type: "",
  });

  const {
    wizard,
    addWizard,
    startPage,
    addOrientation,
    setTitlePage,
    addPageComponent,
    removePageComponent,
  } = useWizardStore();

  const { countIndexPages, plusCount } = useCountStore();
  const { addWizardInList } = useListWizardStore();
  const { loaderTrue } = useLoaderStore();

  const isComponentButtonOrInput = useMemo(() => {
    if (
      component.typeComponent === "button" ||
      component.typeComponent === "label" ||
      component.typeComponent === "input"
    ) {
      return true;
    }
    return false;
  }, [component.typeComponent]);

  const componentAvailable = useMemo(() => {
    return isNotEmpty(component);
  }, [component]);

  function handleOnValueChangeComponent(value: any) {
    setComponent((prev) => {
      return {
        ...prev,
        typeComponent: value,
        id: String(uuidv4()),
      };
    });
  }

  function handleOnChangeTitle(e: any) {
    setTitlePage(e.target.value, countIndexPages);
  }

  function resetMessageError() {
    setMessageError({
      isOpen: false,
      messageError: "",
      type: "",
    });
  }

  const handleRedirectHome = () => {
    window.location.href = "/";
  };

  function saveListWizardInLocalStorage(wizard: IWizard) {
    const listWizardsLocalStorage = localStorage.getItem("wizardsList");

    const dataListWizardsLocalStorage = listWizardsLocalStorage
      ? JSON.parse(listWizardsLocalStorage)
      : [];

    dataListWizardsLocalStorage.push(wizard);

    localStorage.setItem(
      "wizardsList",
      JSON.stringify(dataListWizardsLocalStorage)
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full gap-4">
      {!isCreatingWizard ? (
        <div className="items-center flex flex-col gap-4">
          <h1 className="text-lg sm:text-3xl font-semibold text-center inline-block">
            Crie sua Wizard
          </h1>
          <Button
            onClick={() => {
              setIsCreatingWizard(true);
              addWizard();
            }}
          >
            Criar Wizard Agora!
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center gap-3 ">
            <Label>Escolha a orientação do Wizard</Label>
            <div className="">
              <Select
                onValueChange={(value) => {
                  if (value !== "") {
                    addOrientation(handleOnValueChangeOrientation(value));
                    resetMessageError();
                  }
                }}
                defaultValue=""
              >
                <SelectTrigger id="select-orientation" className="w-[240px]">
                  <SelectValue placeholder="Selecione sua Orientação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="horizontal">Horizontal</SelectItem>
                  <SelectItem value="vertical">Vertical</SelectItem>
                </SelectContent>
              </Select>
              {messageError.isOpen && messageError.type === "orientation" && (
                <span className="font-normal w-full block mt-1 text-center text-xs text-red-600">
                  {messageError.messageError}
                </span>
              )}
            </div>
          </div>
          <Button
            disabled={isCreatingPage}
            onClick={() => {
              if (wizard.orientation !== OrientacaoEnum.VAZIO) {
                setIsCreatingPage(true);
                startPage();
                plusCount();
                resetMessageError();
              } else {
                setMessageError({
                  messageError: "Escolha a orientação do wizard.",
                  isOpen: true,
                  type: "orientation",
                });
              }
            }}
          >
            {!isCreatingPage ? "Criar página" : "Criando Página..."}
          </Button>

          {isCreatingPage && (
            <div className="flex flex-col w-full justify-center items-start gap-4">
              <div className="w-full">
                <Label className="mb-4" htmlFor="titulo">
                  Título da página
                </Label>
                <Input
                  onChange={handleOnChangeTitle}
                  id="titulo"
                  placeholder="Digite o título da página"
                  value={
                    wizard.pages ? wizard.pages[countIndexPages].title : ""
                  }
                />
                {messageError.isOpen && messageError.type === "title" && (
                  <span className="font-normal w-full block mt-1 text-center text-xs text-red-600">
                    {messageError.messageError}
                  </span>
                )}
              </div>
              <div className="w-full">
                <Label className="mb-4">
                  Selecione os componentes da sua página
                </Label>
                <Select
                  onValueChange={(value) => handleOnValueChangeComponent(value)}
                >
                  <SelectTrigger id="component-trigger">
                    <SelectValue placeholder="Escolha seu Componente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="label">Label</SelectItem>
                    <SelectItem value="input">Input</SelectItem>
                    <SelectItem value="button">Button</SelectItem>
                    <SelectItem value="textarea">Text Area</SelectItem>
                  </SelectContent>
                </Select>

                {componentAvailable && (
                  <div
                    className={` ${
                      isComponentButtonOrInput ? "border-4" : "border-0"
                    }  rounded-md p-3 mt-4 `}
                  >
                    <div>
                      {isComponentButtonOrInput && (
                        <div>
                          <Label className="mb-4" htmlFor="titulo">
                            Digite o texto do componente{" "}
                            {component.typeComponent}
                          </Label>
                          <Input
                            className="mt-3"
                            id="textComponente"
                            placeholder="Digite o texto"
                            onChange={(e) => {
                              setComponent((prev) => {
                                return {
                                  ...prev,
                                  text: e.target.value,
                                };
                              });
                            }}
                          />
                          {messageError.isOpen &&
                            messageError.type === "text" && (
                              <span className="font-normal w-full block mt-1 text-center text-xs text-red-600">
                                {messageError.messageError}
                              </span>
                            )}
                        </div>
                      )}
                      <Button
                        className={` ${
                          isComponentButtonOrInput ? "mt-4" : "mt-0"
                        } `}
                        onClick={() => {
                          if (isNotEmpty(component)) {
                            if (isComponentButtonOrInput) {
                              if (component.text) {
                                addPageComponent(component, countIndexPages);
                                setComponent({} as IComponent);
                                resetMessageError();
                              } else {
                                setMessageError({
                                  messageError:
                                    "Escolha o texto para esse componente.",
                                  isOpen: true,
                                  type: "text",
                                });
                              }
                            } else {
                              addPageComponent(component, countIndexPages);
                              setComponent({} as IComponent);
                            }
                          }
                        }}
                      >
                        Adicionar componente
                      </Button>
                    </div>
                  </div>
                )}

                <Table className="mt-10 border-2">
                  <TableCaption>Lista de Componentes Adicionados</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-normal md:font-medium">
                        Componente
                      </TableHead>
                      <TableHead className="font-normal md:font-medium">
                        Texto do Componente
                      </TableHead>
                      <TableHead className="font-normal md:font-medium">
                        {" "}
                        Deletar
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {wizard.pages?.length &&
                      wizard.pages[countIndexPages].components.map(
                        (component, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {component.typeComponent}
                            </TableCell>
                            <TableCell>{component.text}</TableCell>
                            <TableCell>
                              <button
                                onClick={() => {
                                  removePageComponent(
                                    component.id,
                                    countIndexPages
                                  );
                                }}
                              >
                                <Trash2 />
                              </button>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-center items-center w-full gap-4 flex-wrap">
                <Button
                  onClick={() => {
                    if (wizard.pages![countIndexPages].title === "") {
                      setMessageError({
                        messageError:
                          "Escolha o texto para o título da sua página.",
                        isOpen: true,
                        type: "title",
                      });
                    } else {
                      setIsCreatingPage(false);
                      resetMessageError();
                    }
                  }}
                  className="inline-block bg-green-700 px-8"
                >
                  Confirmar Página
                </Button>
              </div>
            </div>
          )}

          <Separator />

          <Button
            disabled={isCreatingPage || wizard.pages === undefined}
            className="w-3/4 bg-green-700 px-8 max-w-[400px]"
            onClick={() => {
              addWizardInList(wizard);
              setIsCreatingWizard(false);
              loaderTrue();
              saveListWizardInLocalStorage(wizard);
              addWizard();
              handleRedirectHome();
            }}
          >
            Criar Wizard
          </Button>
        </>
      )}
    </div>
  );
}
