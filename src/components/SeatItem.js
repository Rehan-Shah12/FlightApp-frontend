import React, { useState } from "react";
import { Modal, Button } from "antd";
import "../styles/SeatItem.css";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../store/thunks/flightThunk";

const SeatItem = ({ seat }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.flight.user);
  const flight = useSelector((state) => state.flight.activeFlight);

  const showModal = () => {
    if (seat.status !== "booked") {
      setOpen(true);
    }
  };

  const handleConfirm = () => {
    dispatch(
      createBooking(
        user._id,
        flight._id,
        seat.classes,
        seat.seatNumber,
        seat.price
      )
    );
    setOpen(!true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const isBooked = seat.status === "booked";

  return (
    <div className={`SeatItem ${isBooked ? "booked" : ""}`} onClick={showModal}>
      <div className={`seat-box ${isBooked ? "booked" : ""}`}>
        {seat?.seatNumber}
      </div>

      <Modal
        open={open}
        title="Confirm Booking"
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to book this seat?</p>
      </Modal>
    </div>
  );
};

export default SeatItem;
