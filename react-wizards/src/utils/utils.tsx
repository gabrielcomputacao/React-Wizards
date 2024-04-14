import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { IComponent } from "./types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function renderComponents(valueComponent: IComponent, index: number) {
  if (valueComponent.typeComponent === "button") {
    return (
      <div>
        <Button key={index}>{valueComponent.text}</Button>
      </div>
    );
  } else if (valueComponent.typeComponent === "label") {
    return (
      <div>
        <Label key={index}> {valueComponent.text} </Label>
      </div>
    );
  } else if (valueComponent.typeComponent === "input") {
    return (
      <div>
        <Input placeholder={valueComponent.text} key={index} />
      </div>
    );
  } else {
    return (
      <div>
        <Textarea key={index} />
      </div>
    );
  }
}
