import { createSlice } from "@reduxjs/toolkit";

const flightSlice = createSlice({
  name: "flight",
  initialState: {
    user: null,
    activeFlight: null,
    filteredFlight: null,
    allflights: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFilteredFlights: (state, action) => {
      state.filteredFlight = action.payload;
    },
    setAllFlights: (state, action) => {
      state.allflights = action.payload;
    },
    setActiveFlight: (state, action) => {
      state.activeFlight = action.payload;
    },
  },
});

export const { setUser, setFilteredFlights, setAllFlights, setActiveFlight } =
  flightSlice.actions;
export default flightSlice.reducer;
