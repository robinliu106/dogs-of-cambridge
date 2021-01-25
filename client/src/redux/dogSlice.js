import { createSlice } from "@reduxjs/toolkit";

export const dogSlice = createSlice({
    name: "dog",
    initialState: {
        activeDog: {},
    },
    reducers: {
        setActiveDog: (state, action) => {
            state.activeDog = action.payload;
        },
    },
});

export const { setActiveDog } = dogSlice.actions;

export const selectActiveDog = (state) => state.dog.activeDog;

export default dogSlice.reducer;
