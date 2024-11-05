import { IFruit } from "./fruit.interface";

export interface IJarItem {
  id: number;
  quantity: number;
}

export interface IJarItemWithFruit {
  fruit: IFruit;
  quantity: number;
}
