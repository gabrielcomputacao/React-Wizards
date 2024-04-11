import { IListComponente, IWizard } from "@/utils/types";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useWizardStore } from "@/store/wizardStore";

export function Wizard() {
  const [indexPage, setIndexPage] = useState(0);

  const { wizard } = useWizardStore();

  function renderComponents(valueComponent: IListComponente) {
    if (valueComponent.componente === "button") {
      return (
        <div>
          <Button>{valueComponent.text}</Button>
        </div>
      );
    } else if (valueComponent.componente === "label") {
      return (
        <div>
          <Label> {valueComponent.text} </Label>
        </div>
      );
    } else if (valueComponent.componente === "input") {
      return (
        <div>
          <Input />
        </div>
      );
    } else {
      return (
        <div>
          <Textarea />
        </div>
      );
    }
  }

  return (
    <div className="flex justify-center items-start h-full">
      {wizard.pages && (
        <div className="bg-slate-300 rounded-md border-2 p-4 w-8/12 mt-8">
          <div className="bg-slate-100 min-h-[50px]">
            {wizard.pages.length !== 0 && (
              <div className="">
                <h1>{wizard.pages[indexPage].title}</h1>
                {wizard.pages[indexPage].components.map((component) => {
                  return renderComponents(component);
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
