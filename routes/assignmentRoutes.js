import { Router } from 'express';
import * as assignmentController from '../controllers/assignmentController.js';
import { checkhealth } from '../middleware/healthcheck.js';
import { validateToken } from '../middleware/requireLogin.js';


const router = Router();

router.get('/v1/assignments', validateToken, checkhealth,  assignmentController.getAllAssignments);
router.post('/v1/assignments', validateToken, checkhealth,assignmentController.createAssignment);
router.get('/v1/assignments/:id', validateToken,checkhealth,assignmentController.getAssignmentById);
router.delete('/v1/assignments/:id',validateToken,checkhealth,assignmentController.deleteAssignment);
router.put('/v1/assignments/:id', validateToken,checkhealth,assignmentController.updateAssignment);

export default router;
