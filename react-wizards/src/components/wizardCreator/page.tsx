import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
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
import { IListComponente } from "@/utils/types";
import { useWizardStore } from "@/store/wizardStore";
import { useCountStore } from "@/store/countStore";

export function SettingsWizardCreator() {
  const [isCreatingWizard, setIsCreatingWizard] = useState(false);
  const [isCreatingPage, setIsCreatingPage] = useState(false);

  const { wizard, addWizard, startPage } = useWizardStore();
  const { countIndexPages } = useCountStore();

  return (
    <div className="flex flex-col justify-center items-center w-full gap-4">
      {!isCreatingWizard ? (
        <div className="items-center flex flex-col gap-4">
          <h1 className="text-3xl font-semibold text-center inline-block">
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
          <div className="flex flex-col items-center gap-3">
            <Label>Escolha a orientação do Wizard</Label>
            <Select>
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Orientação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="horizontal">Horizontal</SelectItem>
                <SelectItem value="vertical">Vertical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            disabled={isCreatingPage}
            onClick={() => {
              setIsCreatingPage(true);
              startPage();
            }}
          >
            {!isCreatingPage ? "Criar página" : "Criando Página..."}
          </Button>

          {isCreatingPage && (
            <div className="flex flex-col w-full justify-center items-start gap-4">
              <div className="w-full">
                <Label className="mb-4" htmlFor="titulo">
                  Titulo da página
                </Label>
                <Input id="titulo" placeholder="Digite o título da página" />
              </div>
              <div className="w-full">
                <Label className="mb-4">
                  Selecione os componentes da sua página
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Componentes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="label">Label</SelectItem>
                    <SelectItem value="input">Input</SelectItem>
                    <SelectItem value="button">Button</SelectItem>
                    <SelectItem value="textarea">Text Area</SelectItem>
                  </SelectContent>
                </Select>

                <div className="border-4 rounded-md p-3 mt-4">
                  <div>
                    <Label className="mb-4" htmlFor="titulo">
                      Digite o texto do componente {"button"}
                    </Label>
                    <Input
                      className="mt-3"
                      id="textComponente"
                      placeholder="Digite o texto"
                    />
                  </div>
                  <Button className="mt-4">Adicionar componente</Button>
                </div>

                <Table className="mt-10 border-2">
                  <TableCaption>Lista de Componentes Adicionados</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-medium">Componente</TableHead>
                      <TableHead className="font-medium">
                        Texto do Componente
                      </TableHead>
                      <TableHead className="font-medium"> Deletar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {wizard.pages?.length &&
                      wizard.pages[countIndexPages].components.map(
                        (component, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {component.componente}
                            </TableCell>
                            <TableCell>{component.text}</TableCell>
                            <TableCell>
                              <Trash2 />
                            </TableCell>
                          </TableRow>
                        )
                      )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-center items-center w-full">
                <Button
                  onClick={() => {
                    setIsCreatingPage(false);
                  }}
                  className="inline-block bg-green-700 px-8"
                >
                  Confirmar Página
                </Button>
              </div>
            </div>
          )}

          <Separator />

          <Button disabled={isCreatingPage} className="w-3/4 bg-green-700 px-8">
            Criar Wizard
          </Button>
        </>
      )}
    </div>
  );
}
