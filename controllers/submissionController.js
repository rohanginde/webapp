
import { getCredentials } from "../middleware/requireLogin.js";
import * as submissionService from "../services/submissionService.js";



export const createSubmission = async (req, res) => {
    const submissionData = req.body;
    console.log(req.params.id)
  
    try {
      
        const arr = getCredentials(req);

        const username = arr[0]
  
      const submission = await submissionService.createSubmission(submissionData ,req.params.id,username);
    
    
    if(submission=='forbidden'){
        return res.status(403).json()
    }

    

      res.status(201).json(submission);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };