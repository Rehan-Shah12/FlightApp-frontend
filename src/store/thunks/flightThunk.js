import axios from "axios";
import { setAllFlights, setFilteredFlights } from "../slices/flightSlice";

export const searchFlights = (filters) => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/flight/search",
      {
        params: filters,
      }
    );
    dispatch(setFilteredFlights(response.data.flights));
  } catch (error) {
    console.error("Error searching flights:", error);
  }
};

export const getAllFlights = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/flight/");
    dispatch(setAllFlights(response.data));
  } catch (error) {
    console.log("Error getting all flights: ", error);
  }
};
