import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IJarItem } from "../../interfaces/jar-item.interface";

interface JarState {
  items: IJarItem[];
}

const initialState: JarState = {
  items: [],
};

const jarSlice = createSlice({
  name: "jar",
  initialState,
  reducers: {
    addFruitToJar: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ id, quantity: 1 });
      }
    },
    addMultipleFruitsToJar: (state, action: PayloadAction<number[]>) => {
      const ids = action.payload;
      ids.forEach((id) => {
        const existingItem = state.items.find((item) => item.id === id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ id, quantity: 1 });
        }
      });
    },
    removeFruitFromJar: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    removeQuantityFromFruitInJar: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity -= quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }
    },
    clearJar: (state) => {
      state.items = [];
    },
  },
});

export const {
  addFruitToJar,
  addMultipleFruitsToJar,
  removeFruitFromJar,
  removeQuantityFromFruitInJar,
  clearJar,
} = jarSlice.actions;
export default jarSlice.reducer;
