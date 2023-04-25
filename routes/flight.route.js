const express = require("express");
const { FlightModel } = require("../models/flight.model");

const flightRouter = express.Router();

// Route to get all the flights available
flightRouter.get("/", async (req, res) => {
  const flights = await FlightModel.find();
  res.send(flights)
});

// Route to get specific flight by Id
flightRouter.get("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    const flight = await FlightModel.findOne({ _id: ID });
    if (flight) {
      res.send({ message: `Flight Details with id:${ID}`, flight })
    } else {
      res.send("Flight not found");
    }
  } catch (error) {
    console.log("Error occurred while finding flight with specific Id");
    console.log(error);
  }
});

// Route to post flight data
flightRouter.post("/add", async (req, res) => {
  try {
    const {
      airline,
      flightNo,
      departure,
      arrival,
      departureTime,
      arrivalTime,
      seats,
      price,
    } = req.body;
    const flight = new FlightModel({
      airline,
      flightNo,
      departure,
      arrival,
      departureTime,
      arrivalTime,
      seats,
      price,
    });
    await flight.save();
    res
      .status(201)
      .json({ message: "Flight added successfully", flight: flight });
  } catch (error) {
    console.log("Error Occurred while adding the flight to database");
    console.log(error);
  }
});

// Route to update flight data with specific Id
flightRouter.put("/update/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    const flight = await FlightModel.findByIdAndUpdate({ _id: ID }, req.body, {
      new: true,
    });
    if (!flight) {
      res.send({ message: `Flight with id:${req.params.id} not found` });
    }

    res.send({
      message: `Flight with id:${req.params.id} updated successfully`,
    });
  } catch (error) {
    console.log("Error occurred while upadating a flight data");
    console.log(error);
  }
});

// Route to delete flight data with specific Id
flightRouter.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    const flight = await FlightModel.findByIdAndDelete({ _id: ID });
    if (!flight) {
      res.send({ message: `Flight with id:${req.params.id} not found` });
    }

    res.send({
      message: `Flight with id:${req.params.id} deleted successfully`,
    });
  } catch (error) {
    console.log("Error occurred while deleteing a flight data");
    console.log(error);
  }
});

module.exports = {
  flightRouter,
};
