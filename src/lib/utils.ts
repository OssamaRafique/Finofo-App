import { GroupBy } from "@/enums/groupBy.enum";
import { IFruit, IGroupedFruit } from "@/interfaces/fruit.interface";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const groupFruitsBy = (
  fruits: IFruit[],
  groupBy: GroupBy
): IGroupedFruit[] => {
  const groupedFruits: IGroupedFruit[] = [];

  if (groupBy === GroupBy.None) {
    return [];
  }

  const groupMap: { [key: string]: IFruit[] } = {};

  fruits.forEach((fruit) => {
    let key: string;
    switch (groupBy) {
      case GroupBy.Family:
        key = fruit.family;
        break;
      case GroupBy.Order:
        key = fruit.order;
        break;
      case GroupBy.Genus:
        key = fruit.genus;
        break;
      default:
        key = "Unknown";
    }

    if (!groupMap[key]) {
      groupMap[key] = [];
    }
    groupMap[key].push(fruit);
  });

  for (const [group, fruits] of Object.entries(groupMap)) {
    groupedFruits.push({ group, fruits });
  }

  return groupedFruits;
};

export const generateColorFromName = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    const lightValue = Math.floor((value + 255) / 2);
    color += ("00" + lightValue.toString(16)).slice(-2);
  }
  return color;
};
