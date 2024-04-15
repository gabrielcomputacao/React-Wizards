"use client";
import { Header } from "@/components/header/page";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useListWizardStore } from "@/store/listWizardStore";
import { useLoaderStore } from "@/store/loaderStore";
import { IWizard } from "@/utils/types";
import Image from "next/image";

import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const { listWizards } = useListWizardStore();
  const { loader, loaderFalse, loaderTrue } = useLoaderStore();
  const [getListWizards, setListWizards] = useState<Array<IWizard>>(
    [] as Array<IWizard>
  );

  useEffect(() => {
    const getListWizardsLocalStorage = localStorage.getItem("wizardsList");

    if (getListWizardsLocalStorage) {
      setListWizards(JSON.parse(getListWizardsLocalStorage));
    }

    loaderFalse();
  }, [listWizards]);

  return (
    <div>
      <Header />
      <div className="w-full h-full">
        {loader ? (
          <div className="flex justify-center items-center w-screen h-screen">
            <Image
              unoptimized
              src="/assets/loader.gif"
              alt="loader gif"
              width={100}
              height={100}
            />
          </div>
        ) : (
          <div className="p-5 w-full h-full">
            {getListWizards.length > 0 ? (
              <div className="flex justify-center items-center gap-5 flex-wrap">
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
                      <Link
                        className="bg-primary text-primary-foreground hover:bg-primary/90 px-2 py-1 rounded-sm"
                        href={`/wizard/${index}`}
                      >
                        Ver Wizard
                      </Link>
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
        )}
      </div>
    </div>
  );
}
