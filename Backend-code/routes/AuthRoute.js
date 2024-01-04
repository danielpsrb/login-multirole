import express from "express";
import {Login, Logout, Visitor} from "../controllers/Auth.js";

const router = express.Router();

router.get('/visitor', Visitor);
router.post('/login', Login);
router.delete('/logout', Logout);

export default router;