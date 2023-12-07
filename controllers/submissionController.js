
import { getCredentials } from "../middleware/requireLogin.js";
import * as submissionService from "../services/submissionService.js";



export const createSubmission = async (req, res) => {
    const submissionData = req.body;
    console.log(req.params.id)



    const { submission_url, ...extraFields } = req.body;

    // Check if "submission_url" is present and is a string
    if (!submission_url) {
      return res.status(400).json({ error: "'submission_url' is missing in the request body." });
    }
  
    if (typeof submission_url !== 'string') {
      return res.status(400).json({ error: "'submission_url' must be a string." });
    }
  
    // Check for additional fields and reject the request if present
    if (Object.keys(extraFields).length > 0) {
      return res.status(400).json({ error: "Additional fields in the request body are not allowed." });
    }

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