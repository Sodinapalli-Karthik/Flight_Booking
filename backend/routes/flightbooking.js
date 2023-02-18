import express from "express";
import { createSeats,deleteSeats,getAllSeats,updateSeatAvailability,getSeats,updateSeats } from "../controllers/flightbookings.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/:flightid",verifyAdmin, createSeats)

//update
router.put("/availability/:id", updateSeatAvailability);

router.put("/:id",verifyAdmin,updateSeats)

//delete

router.delete("/:id/:flightid",verifyAdmin, deleteSeats)

//get 
router.get("/:id",getSeats)

// get all
router.get("/",getAllSeats)

export default router