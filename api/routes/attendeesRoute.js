import express  from "express";
import { createAttendee, getAttendee, getAttendees } from "../controllers/attendeesController.js";

const router = express.Router()

router.get('/', getAttendees)
router.get('/:id', getAttendee)
router.post('/create' , createAttendee)

export default router

