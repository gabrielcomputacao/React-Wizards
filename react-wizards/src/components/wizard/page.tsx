import { IComponent, IWizard } from "@/utils/types";
import { useMemo, useState } from "react";
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
import { renderComponents } from "@/utils/utils";

export function Wizard() {
  const { wizard } = useWizardStore();
  const { countIndexPages, setCountIndex } = useCountStore();

  const orientationSelected = useMemo(() => {
    if (wizard.orientation === "horizontal") {
      return true;
    }

    return false;
  }, [wizard.orientation]);

  return (
    <div className="flex justify-center items-start h-full">
      {wizard.pages && (
        <div
          className={`bg-slate-300 rounded-md border-2 p-4 w-8/12 mt-8 ${
            orientationSelected
              ? ""
              : "flex flex-row-reverse justify-center gap-3 items-center "
          } `}
        >
          <div className="bg-slate-100 min-h-[50px] w-full relative">
            <span className="absolute right-3">
              Page: {`${countIndexPages + 1}`}
            </span>
            {wizard.pages.length !== 0 && (
              <div className="flex flex-col justify-center items-center gap-5 p-5">
                <h1 className="font-semibold text-3xl">
                  {wizard.pages[countIndexPages].title}
                </h1>
                {wizard.pages[countIndexPages].components.map(
                  (component, index) => {
                    return (
                      <div key={index}>
                        {" "}
                        {renderComponents(component, index)}{" "}
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
          <div className="mt-3   flex justify-center">
            <div className="w-3/5 ">
              <Pagination>
                <PaginationContent
                  className={` ${
                    orientationSelected
                      ? ""
                      : "flex flex-col items-center justify-center gap-1"
                  } `}
                >
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
