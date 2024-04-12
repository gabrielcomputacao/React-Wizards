import { IComponent, IWizard } from "@/utils/types";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useWizardStore } from "@/store/wizardStore";
import { useCountStore } from "@/store/countStore";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";

export function Wizard() {
  const { wizard } = useWizardStore();
  const { countIndexPages, setCountIndex } = useCountStore();

  function renderComponents(valueComponent: IComponent) {
    if (valueComponent.typeComponent === "button") {
      return (
        <div>
          <Button>{valueComponent.text}</Button>
        </div>
      );
    } else if (valueComponent.typeComponent === "label") {
      return (
        <div>
          <Label> {valueComponent.text} </Label>
        </div>
      );
    } else if (valueComponent.typeComponent === "input") {
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
          <div className="bg-slate-100 min-h-[50px] relative">
            <span className="absolute right-3">
              Page: {`${countIndexPages + 1}`}
            </span>
            {wizard.pages.length !== 0 && (
              <div className="flex flex-col justify-center items-center gap-5 p-5">
                <h1 className="font-semibold text-3xl">
                  {wizard.pages[countIndexPages].title}
                </h1>
                {wizard.pages[countIndexPages].components.map((component) => {
                  return renderComponents(component);
                })}
              </div>
            )}
          </div>
          <div className="mt-3   flex justify-center">
            <div className="w-3/5 ">
              <Pagination>
                <PaginationContent>
                  {wizard.pages.map((_, index) => {
                    return (
                      <PaginationItem key={index}>
                        <button
                          onClick={() => {
                            setCountIndex(index);
                          }}
                          className="bg-slate-100  p-1"
                        >
                          {index + 1}
                        </button>
                      </PaginationItem>
                    );
                  })}
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
