"use client";
import { GenerateWizard } from "@/components/generateWizard/page";
import { useListWizardStore } from "@/store/listWizardStore";
import { IWizard, OrientacaoEnum } from "@/utils/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function WizardId() {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[2];

  const { listWizards } = useListWizardStore();
  const [wizardSelected, setWizardSelected] = useState({} as IWizard);

  useEffect(() => {
    const getListWizardsLocalStorage = localStorage.getItem("wizardsList");

    if (getListWizardsLocalStorage) {
      const dataWizard = JSON.parse(getListWizardsLocalStorage);

      if (dataWizard[id]) {
        setWizardSelected(dataWizard[id]);
      } else {
        setWizardSelected({
          orientation: OrientacaoEnum.VAZIO,
          pages: undefined,
          id: String(uuidv4()),
        });
      }
    }
  }, [listWizards, id, pathname]);

  return (
    <div className="p-5">
      <Link
        className="bg-primary text-primary-foreground hover:bg-primary/90 px-2 py-1 rounded-sm"
        href="/"
      >
        Voltar
      </Link>
      <div>
        <GenerateWizard wizard={wizardSelected} />
      </div>
    </div>
  );
}
