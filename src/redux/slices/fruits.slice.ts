import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchFruits } from "@/api/fruityViceApi";
import { GroupBy } from "@/enums/groupBy.enum";
import { IFruit } from "@/interfaces";

interface FruitsState {
  entities: Record<number, IFruit>;
  groupBy: GroupBy;
  loading: boolean;
  error: string | null;
}

const initialState: FruitsState = {
  entities: {},
  groupBy: GroupBy.None,
  loading: false,
  error: null,
};

export const loadFruits = createAsyncThunk<IFruit[]>(
  "fruits/loadFruits",
  async () => {
    return await fetchFruits();
  }
);

const fruitsSlice = createSlice({
  name: "fruits",
  initialState,
  reducers: {
    setGroupBy: (state, action: PayloadAction<GroupBy>) => {
      state.groupBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFruits.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loadFruits.fulfilled,
        (state, action: PayloadAction<IFruit[]>) => {
          state.loading = false;
          state.entities = action.payload.reduce((acc, fruit) => {
            acc[fruit.id] = fruit;
            return acc;
          }, {} as Record<number, IFruit>);
        }
      )
      .addCase(loadFruits.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load fruits.";
      });
  },
});

export default fruitsSlice.reducer;
export const { setGroupBy } = fruitsSlice.actions;
