import express from "express";
import { countByCity, getFlightSeats,countByType, createFlight, deleteFlight, getAllFlight, getFlight, updateFlight } from "../controllers/flight.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/",verifyAdmin, createFlight)

//update
router.put("/:id",verifyAdmin,updateFlight)

//delete

router.delete("/:id",verifyAdmin, deleteFlight)

//get 
router.get("/find/:id",getFlight)

// get all
router.get("/",getAllFlight
)

router.get("/countByCity",countByCity)
router.get("/countByType",countByType)
router.get("/seat/:id",getFlightSeats)

export default router