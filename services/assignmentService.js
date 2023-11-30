import { where } from "sequelize";
import logger from "../logger.cjs";
import { Assignment } from "../models/assignment.js";

import { User } from "../models/user.js";

export const getAllAssignments = async (req, res) => {

  const assignments = await Assignment.findAll({
    attributes: {
      exclude: ['createdBy'],
    },
  });
  logger.info("Get All Assignments")
  return assignments;
};

export const createAssignment = async (assignmentData) => {
 
  logger.info("Assignment Created")
  console.log(assignmentData.createdBy);
  const assignment = await Assignment.create(assignmentData); //inbuilt method

   delete assignment.createdBy;
  
  return assignment;
};

//-----------------------------------------------------------
export const getAssignmentById = async (id) => {
  try {
    return await findAssignment(id);
  
  } catch (error) {
    throw new Error(error.message);
  }
};

//-----------------------------------------------------------
export const deleteAssignmentById = async (id, email) => {
  try {
    const assignment = await findAssignment(id);
    
    logger.info("Assignment Deleted")
    console.log(email , assignment.createdBy)
    if(assignment == undefined){
      return -1;
    }
    if (email == assignment.createdBy) {
      await assignment.destroy();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    
   return -2;
  }
};

//-----------------------------------------------------------
export const updateAssignmentById = async (id, assignmentData, email) => {
  try {
    const assignment = await findAssignment(id);
    assignment.name = assignmentData.name;
    assignment.points = assignmentData.points;
    assignment.num_of_attempts = assignmentData.num_of_attempts;
    assignment.deadline = assignmentData.deadline;
    assignment.assignment_updated = new Date().toISOString();

    if (email == assignment.createdBy) {
      await assignment.save();
      logger.info("Assignment Updated")
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

//-----------------------------------------------------------
export const findAssignment = async (id) => {
  const assignment = await Assignment.findOne({ where: { id } ,
    // Add any other query options as needed
  });
  if (!assignment) {
    logger.error("Assignment not found")
    throw new Error("Assignment not found");
  }
  return assignment;
};
