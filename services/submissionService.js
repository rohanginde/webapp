
import { Submission } from "../models/submission.js";
import { publishToSNS } from "../scripts/sns.js";
import { findAssignment, getAssignmentById } from "./assignmentService.js";

export const createSubmission = async (submissionData , assignment_id, username) => {
    const { submission_url } = submissionData;

    try{

    
   const assignment = await getAssignmentById(assignment_id)
   
   if(!assignment){
    throw new Error("Assignment Not found");
   }

 if(assignment.createdBy != username){
   return 'forbidden';
 }

if (assignment.deadline < new Date()){
    throw new Error(`Submission rejected ! Your fuckin deadline is passed`)
}
  const count = await Submission.count({
    where: { assignment_id },
  });
  
  
   if(count >= assignment.num_of_attempts){
     throw new Error("Limit exceeded")
   }


    let submission = {
        "submission_url" : submission_url,
        "assignment_id": assignment_id,
        "created_by":username
        
    }

    const submission_final = await Submission.create(submission);
     

    const message = {
        "email":username,
        "submission_url":submission.submission_url,
       "assignment_id":assignment_id,
          "submission_id":submission_final.id,
    }

    publishToSNS(message)
    return submission_final;
}catch (error) {
    throw new Error(error.message);
  }


  }
  

  export const updateSubmission = async (submission, newSubmissionurl)=>{

console.log(submission.retry_count + 1)
     submission.retry_count = submission.retry_count + 1;
     console.log(submission.retry_count)
     submission.submission_url = newSubmissionurl;
     try {
        submission.save();
        return "updated";
     } catch (error) {
        throw new Error(error.message);
     }
     

  }