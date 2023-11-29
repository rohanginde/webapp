import { Router } from 'express';
import * as submissionController from '../controllers/submissionController.js';
import { validateToken } from '../middleware/requireLogin.js';


const router = Router();


router.post('/v1/assignments/:id/submission', validateToken, submissionController.createSubmission);

export default router;
