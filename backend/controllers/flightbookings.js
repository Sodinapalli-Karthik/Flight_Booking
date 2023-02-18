import Seat from "../models/Flightbooking.js";
import Flights from "../models/Flights.js";
import { createError } from "../utils/error.js";

export const createSeats = async (req, res, next) => {
  const flightId = req.params.flightid;
  const newSeat = new Seat(req.body);

  try {
    const savedSeat = await newSeat.save();
    try {
      await Flights.findByIdAndUpdate(flightId, {
        $push: { seats: savedSeat._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedSeat);
  } catch (err) {
    next(err);
  }
};

export const updateSeats = async (req, res, next) => {
  try {
    const updatedSeat = await Seat.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedSeat);
  } catch (err) {
    next(err);
  }
};
export const updateSeatAvailability = async (req, res, next) => {
  try {
    await Seat.updateOne(
      { "seatNumbers._id": req.params.id },
      {
        $push: {
          "seatNumbers.$.unavailableDates": req.body.dates
        },
      }
      
    );
    res.status(200).json("Seat status has been updated.");
  } catch (err) {
    next(err);
  }
};
export const deleteSeats = async (req, res, next) => {
  const flightId = req.params.flightid;
  try {
    await Seat.findByIdAndDelete(req.params.id);
    try {
      await Flights.findByIdAndUpdate(flightId, {
        $pull: { seats: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Seat has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getSeats = async (req, res, next) => {
  try {
    const seats = await Seat.findById(req.params.id);
    res.status(200).json(seats);
  } catch (err) {
    next(err);
  }
};
export const getAllSeats = async (req, res, next) => {
  try {
    const allSeats = await Seat.find();
    res.status(200).json(allSeats);
  } catch (err) {
    next(err);
  }
};
