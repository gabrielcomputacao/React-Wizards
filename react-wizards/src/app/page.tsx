"use client";
import { Header } from "@/components/header/page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useListWizardStore } from "@/store/listWizardStore";
import { IWizard } from "@/utils/types";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const { listWizards } = useListWizardStore();
  const [getListWizards, setListWizards] = useState<Array<IWizard>>(
    [] as Array<IWizard>
  );

  useEffect(() => {
    if (listWizards.length > 0) {
      setListWizards(listWizards);
    }

    const getListWizardsLocalStorage = localStorage.getItem("wizardsList");

    if (getListWizardsLocalStorage) {
      setListWizards(JSON.parse(getListWizardsLocalStorage));
    }
  }, [listWizards]);

  return (
    <div>
      <Header />
      <div className="w-full h-full">
        <div className="p-5 w-full h-full">
          {getListWizards.length > 0 ? (
            <div className="flex items-center gap-5 flex-wrap">
              {getListWizards.map((wizard, index) => (
                <Card
                  key={`${index}- ${String(uuidv4())}`}
                  className="w-[350px] bg-slate-100"
                >
                  <CardHeader>
                    <CardTitle className="text-neutral-800">
                      Wizard {index + 1}
                    </CardTitle>
                    <CardDescription>
                      {" "}
                      Orientação: {wizard.orientation}{" "}
                    </CardDescription>
                  </CardHeader>
                  <CardContent key={`${index}- ${String(uuidv4())}`}>
                    <p className="font-semibold p-1 bg-slate-200 rounded-md">
                      Números de páginas: {wizard.pages?.length}
                    </p>
                  </CardContent>
                  <CardContent key={`${index}- ${String(uuidv4())}`}>
                    <h2 className="text-xl text-neutral-800 font-medium">
                      Páginas
                    </h2>
                  </CardContent>
                  {wizard.pages?.map((page, index) => (
                    <CardContent key={`${index}- ${String(uuidv4())}`}>
                      <p className="font-semibold p-1 bg-slate-200 rounded-md">
                        Título da página: {page.title}
                      </p>
                    </CardContent>
                  ))}
                  <CardFooter className="flex">
                    <Button>Ver Wizard</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-screen w-screen">
              <p className="text-center font-semibold text-3xl">
                Você ainda não tem wizards Cadastradas.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
