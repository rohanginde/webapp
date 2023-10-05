import { Router } from 'express';
import * as assignmentController from '../controllers/assignmentController.js';
import { validateToken } from '../middleware/requireLogin.js';


const router = Router();

router.get('/v1/assignments', validateToken, assignmentController.getAllAssignments);
router.post('/v1/assignments', validateToken, assignmentController.createAssignment);
router.get('/v1/assignments/:id', validateToken, assignmentController.getAssignmentById);
router.delete('/v1/assignments/:id',validateToken,assignmentController.deleteAssignment);
router.put('/v1/assignments/:id', validateToken, assignmentController.updateAssignment);

export default router;
