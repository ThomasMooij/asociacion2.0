import express from 'express';
import { uploadController, photosController, photoController} from '../controllers/picsController.js';

const router = express.Router();

router.post('/upload', uploadController);
router.get('/:collectionName' , photoController)
router.get('/' , photosController)

export default router;