import { OrientacaoEnum } from "./types";

export function isNotEmpty(obj: any): obj is {} {
  return !(Object.keys(obj).length === 0);
}
export function isEmpty(obj: any): obj is {} {
  return Object.keys(obj).length === 0;
}

export function handleOnValueChangeOrientation(value: any) {
  if (value == "horizontal") {
    return OrientacaoEnum.HORIZONTAL;
  } else if (value == "vertical") {
    return OrientacaoEnum.VERTICAL;
  } else {
    return OrientacaoEnum.VAZIO;
  }
}
