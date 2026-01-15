import { createSlice } from "@reduxjs/toolkit";
import { store } from "../store";

type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 10,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count++;
    },
    decrement: (state) => {
      state.count--;
    },
  },
});

export const counterReducer = counterSlice.reducer;

// action creator not action
export const {increment , decrement} = counterSlice.actions 