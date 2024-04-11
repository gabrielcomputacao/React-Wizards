"use client";

import { Wizard } from "@/components/wizard/page";
import { SettingsWizardCreator } from "@/components/wizardCreator/page";

export default function WizardCreator() {
  return (
    <div className="min-w-screen min-h-screen">
      <div className="grid grid-cols-3 min-h-screen min-w-screen">
        <div className="col-span-1 border-r-2 p-4 w-full ">
          <SettingsWizardCreator />
        </div>
        <div className="col-span-2 ">
          <Wizard />
        </div>
      </div>
    </div>
  );
}
