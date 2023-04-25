const express = require("express");
const { UserModel } = require("../models/user.model");
const { FlightModel } = require("../models/flight.model");
const { BookingModel } = require("../models/booking.model");

const bookingRouter = express.Router();

bookingRouter.post("/", async (req, res) => {
  const { userId, flightId } = req.body;
  try {
    const user = await UserModel.findById({ _id: userId });
    const flight = await FlightModel.findById({ _id: flightId });
    if (!user || !flight) {
      res.send({ message: "User or Flight not found" });
    } else {
      const booking = new BookingModel({ user: user, flight: flight });
      await booking.save();
      res.send({ message: "Flight Booked successfully", booking });
    }
  } catch (error) {
    console.log("Error occurred while booking the flight");
    console.log(error);
  }
});

bookingRouter.get("/dashboard", async (req, res) => {
  const bookings = await BookingModel.find();
  res.send(bookings);
});

module.exports = {
  bookingRouter,
};
