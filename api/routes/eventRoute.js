import express from 'express'
import { createEvent, deleteEvent, getEvent, getEvents, updateEvent } from '../controllers/eventController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', getEvents)
router.get('/:id', getEvent)
router.post('/create', verifyToken, createEvent)
router.put('/update/:id' , verifyToken, updateEvent)
router.delete('/delete', verifyToken, deleteEvent)

export default router
