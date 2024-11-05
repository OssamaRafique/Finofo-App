import { IFruit } from "@/interfaces/fruit.interface";
import { FruitItem } from "./FruitItem";

export interface IFruitListProps {
  fruits: IFruit[];
}

export function FruitList({ fruits }: IFruitListProps) {
  return fruits.map((fruit) => <FruitItem key={fruit.id} fruit={fruit} />);
}
