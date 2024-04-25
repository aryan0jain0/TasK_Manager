import express from "express";
import { signup, login } from "../controllers/userController.js";

const router = express.Router();

router.get("/", async (req, res)=>{
    res.send("user route")
})
router.post("/signup", signup);
router.post("/login", login);

export default router;
