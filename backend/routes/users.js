import express from "express";
import {
    updateUser,
    deleteUser,
    getUser,
    getAllUser,
  } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
// import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";


const router = express.Router();

// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("hello user, u r logged in")
// })

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("hello user,u r logged in and u can dete ur account")
// })
// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("hello Admin,u r logged in and u can delete accounts")

// })

//UPDATE
router.put("/:id",verifyUser, updateUser);

//DELETE
router.delete("/:id",verifyUser, deleteUser);

//GET
router.get("/:id",verifyUser, getUser);

//GET ALL
router.get("/",verifyAdmin, getAllUser);

export default router