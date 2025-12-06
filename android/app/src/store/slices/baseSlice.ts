import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BaseState {
  value: number;
  currentUser: any
}

const initialState: BaseState = {
  value: 0,
  currentUser: null,
  inputLabelTexts: [
    "Where do you want to go today?",
    "Explore one destination at a time.",
    "Adventure is waiting for you!",
  ],

  inputValue: "",
};

export const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
      setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    clearInputValue: (state) => {
      state.inputValue = "";
    },
    setInputLabelTexts: (state, action) => {
      state.inputLabelTexts = action.payload;
    },
  },
});

export const {clearInputValue, setInputValue, increment, decrement, incrementByAmount } = baseSlice.actions;
export default baseSlice.reducer;
