import axios from "axios";
import {
  setActiveFlight,
  setAllFlights,
  setFilteredFlights,
  setUser,
} from "../slices/flightSlice";

export const searchFlights = (filters) => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/flight/search",
      {
        params: {
          ...filters,
        },
      }
    );

    dispatch(setFilteredFlights(response?.data?.flights));
    console.log("Filtered: ", response?.data?.flights);
  } catch (error) {
    console.error("Error searching flights:", error);
  }
};

export const getAllFlights = (page, pageSize) => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:8080/api/v1/flight/", {
      params: {
        page,
        pageSize,
      },
    });

    const { flights, totalPages } = response.data;

    dispatch(setAllFlights(flights));

    return { flights, totalPages };
  } catch (error) {
    console.log("Error getting all flights: ", error);
  }
};

export const getFlightById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/flight/${id}`
    );
    dispatch(setActiveFlight(response.data));
  } catch (error) {
    console.log("Error Getting Flight By Id");
  }
};

export const getUserById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/auth/${id}`);
    dispatch(setUser(response.data));
  } catch (error) {
    console.log("Error Getting User By Id");
  }
};

export const createBooking =
  (user, flight, classes, seatNumber, totalPrice) => async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.post(
        `http://localhost:8080/api/v1/booking/create`,
        {
          user,
          flight,
          classes,
          seatNumber,
          totalPrice,
        },
        { headers }
      );

      const getresponse = await axios.patch(
        `http://localhost:8080/api/v1/flight/update/${flight}`,
        {
          seatNumber,
        },
        { headers }
      );
    } catch (error) {
      console.log("Error Creating Booking");
    }
  };
