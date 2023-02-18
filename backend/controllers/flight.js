import Flights from "../models/Flights.js";
import Seat from "../models/Flightbooking.js"


export const createFlight=async(req,res,next)=>{
    const newFlight = new Flights(req.body)
    try {
        const savedFlight = await newFlight.save();
        res.status(200).json(savedFlight)
    } catch (err) {
       next(err)

    }
    
}

export const updateFlight=async(req,res,next)=>{
    try {
        const updatedFlight = await Flights.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedFlight)
    } catch (err) {
        next(err)

    }
    
}
export const deleteFlight=async(req,res,next)=>{
    try {
        await Flights.findByIdAndDelete(req.params.id);
       res.status(200).json("Flight has been deleted")
   } catch (err) {
       next(err)
   }
}

export const getFlight=async(req,res,next)=>{
    try {
        const flight = await Flights.findById(req.params.id);
        res.status(200).json(flight)
    } catch (err) {
       next(err)

    }
}

export const getAllFlight=async(req,res,next)=>{
    // const {min,max,...others}=req.query;
    try {
        const flights = await Flights.find(req.query);
        res.status(200).json(flights)
    } catch (err) {
        next(err)
    }
}

export const countByCity =async(req,res,next)=>{
    const cities= req.query.cities.split(",")
    try {
        const list =await Promise.all(cities.map(city=>{
            return Flights.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

export const countByType =async(req,res,next)=>{
    try {
        const flightCount= await Flights.countDocuments({type:"economic"});
        const BudgetCount= await Flights.countDocuments({type:"budget"});
        const BusinessCount= await Flights.countDocuments({type:"business"})
        const LuxuryCount= await Flights.countDocuments({type:"luxury"})
        const firstClassCount= await Flights.countDocuments({type:"first class"})
        res.status(200).json([
            {type:"economic",count:flightCount},
            {type:"budget",count:BudgetCount},
            {type:"business",count:BusinessCount},
            {type:"luxury",count:LuxuryCount},
            {type:"first class",count:firstClassCount}

        ])
    } catch (err) {
        next(err)
    }
}

export const getFlightSeats= async (req,res,next)=>{

    try{
        const flight=await Flights.findById(req.params.id)
        const list =await Promise.all(flight.seats.map(seat=>{
            return Seat.findById(seat)
        }))
        res.status(200).json(list)
    }
    catch(err){
        next(err)
    }

}