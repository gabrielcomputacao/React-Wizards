import { renderComponents } from "@/utils/utils";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import { IWizard } from "@/utils/types";

type generateWizardProps = {
  wizard: IWizard;
};

export function GenerateWizard({ wizard }: generateWizardProps) {
  const [indexPageWizard, setIndexPageWizard] = useState(0);

  return (
    <div>
      <div>
        <div className="flex justify-center items-start h-full">
          {wizard.pages ? (
            <div
              className={`bg-slate-300 rounded-md border-2 p-4 w-auto sm:w-8/12 mt-8 ${
                wizard.orientation === "horizontal"
                  ? ""
                  : "flex flex-row-reverse justify-center gap-3 items-center "
              } `}
            >
              <div className="bg-slate-100 min-h-[50px] w-full relative">
                <span className="text-sm sm:text-base absolute right-3">
                  Page: {`${indexPageWizard + 1}`}
                </span>
                {wizard?.pages?.length !== 0 && (
                  <div className="flex flex-col justify-center items-center gap-5 p-5">
                    <h1 className="font-semibold  text-xl sm:text-3xl">
                      {wizard?.pages?.[indexPageWizard].title}
                    </h1>
                    {wizard?.pages?.[indexPageWizard].components.map(
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
                        wizard.orientation === "horizontal"
                          ? ""
                          : "flex flex-col items-center justify-center gap-1"
                      } `}
                    >
                      {wizard?.pages?.map((_, index) => {
                        return (
                          <PaginationItem key={index}>
                            <button
                              onClick={() => {
                                setIndexPageWizard(index);
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
          ) : (
            <div className="flex justify-center items-center h-screen w-screen">
              <p className="text-center font-semibold text-3xl">
                Não existe Wizard criada nesse index.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
