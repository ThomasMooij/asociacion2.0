import express from 'express';
import { uploadController, photosController, photoController, titleChecker} from '../controllers/picsController.js';

const router = express.Router();

router.post('/upload', uploadController);
router.get('/:collectionName' , photoController)
router.get('/' , photosController)
router.post('/check' ,  titleChecker)

export default router;