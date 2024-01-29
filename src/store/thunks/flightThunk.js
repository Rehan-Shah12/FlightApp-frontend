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
    console.log("Respone Search Flight:", response);

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
    console.log("Active Flight Response:", response.data);
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

      console.log("Get Response m", getresponse);
    } catch (error) {
      console.log("Error Creating Booking");
    }
  };

// export const createBooking =
//   (user, flight, classes, seatNumber, totalPrice) => async () => {
//     try {
//       const accessToken = localStorage.getItem("token")
//       console.log("token: ", accessToken)

//       // Include the token in the Authorization header
//       const headers = {
//         Authorization: `Bearer ${accessToken}`,
//       };

//       // Make the HTTP requests with the headers
//       await axios.post("http://localhost:8080/api/v1/booking/create", {
//         user,
//         flight,
//         classes,
//         seatNumber,
//         totalPrice,
//       }, { headers });

//       const getresponse = await axios.patch(`http://localhost:8080/api/v1/flight/update/${flight}`, {
//         seatNumber,
//       }, { headers });

//       console.log("Get Response:", getresponse);

//       console.log("Get Response m", getresponse);
//     } catch (error) {
//       console.log("Error Creating Booking");
//     }
//   };
