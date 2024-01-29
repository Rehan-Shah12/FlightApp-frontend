import { createSlice } from "@reduxjs/toolkit";

const flightSlice = createSlice({
  name: "flight",
  initialState: {
    user: null,
    activeFlight: null,
    filteredFlight: null,
    allflights: null,
    pageNo: null,
    pageSize: null,
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
    setPageSize: (state,action) => {
      state.pageSize = action.payload
    },
    setPageNo: (state,action) => {
      state.pageNo = action.payload
    }
  },
});

export const { setUser, setFilteredFlights, setAllFlights, setActiveFlight, setPageSize, setPageNo } =
  flightSlice.actions;
export default flightSlice.reducer;
