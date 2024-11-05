import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IFruit, IGroupedFruit } from "../../interfaces/fruit.interface";
import {
  IJarItem,
  IJarItemWithFruit,
} from "../../interfaces/jar-item.interface";
import { GroupBy } from "@/enums/groupBy.enum";
import { groupFruitsBy } from "@/lib/utils";

export const selectFruits = (state: RootState): Record<number, IFruit> =>
  state.fruits.entities;

export const selectFruitsArray = createSelector(
  [selectFruits],
  (fruits): IFruit[] => Object.values(fruits)
);

export const selectJarItems = (state: RootState): IJarItem[] => state.jar.items;

export const selectJarDetails = createSelector(
  [selectFruits, selectJarItems],
  (fruits, jarItems): IJarItemWithFruit[] => {
    return jarItems
      .map(({ id, quantity }) => {
        const fruit = fruits[id];
        return fruit ? { fruit, quantity } : null;
      })
      .filter((item): item is IJarItemWithFruit => item !== null);
  }
);

export const selectTotalCalories = createSelector(
  [selectJarDetails],
  (jarDetails): number => {
    return jarDetails.reduce(
      (total, item) => total + item.fruit.nutritions.calories * item.quantity,
      0
    );
  }
);

export const selectGroupBy = (state: RootState): GroupBy =>
  state.fruits.groupBy;

export const selectGroupedFruits = createSelector(
  [selectFruitsArray, selectGroupBy],
  (fruits, groupBy): IGroupedFruit[] => {
    return groupBy === GroupBy.None ? [] : groupFruitsBy(fruits, groupBy);
  }
);
