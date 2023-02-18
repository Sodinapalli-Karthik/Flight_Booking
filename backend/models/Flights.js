import mongoose from "mongoose";
const Flightschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  starting: {
    type: String,
    required: true,
  },
  departure: {
    type: String,
    required: true,
  },
  arrival: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  fromdate: {
    type: String,
    required: true,
  },
  enddate: {
    type: String,
    required: true,
  },
  aiportTitle: {
    type: String,
    required: true,
  },
  hours: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  seats: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  ticketfare: {
    type: Number,
    required: true,
  },
  taxes: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Flights",Flightschema )