import { windowWidthSignal } from "./app.state";

export function updateWindowWidthSignal(width: number){
  windowWidthSignal.set(width)
}


