import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", (req, res) => res.send("INSIDE AUTHENTICATED USER PAGE"));

export default userRoutes;