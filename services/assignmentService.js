import { where } from "sequelize";
import { Assignment } from "../models/assignment.js";

import { User } from "../models/user.js";

export const getAllAssignments = async (req, res) => {

  const assignments = await Assignment.findAll();

  return assignments;
};

export const createAssignment = async (assignmentData) => {
 
 
  console.log(assignmentData.createdBy);
  const assignment = await Assignment.create(assignmentData); //inbuilt method
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
   
    if(assignment == undefined){
      return 0;
    }
    if (email == assignment.createdBy) {
      await assignment.destroy();
      return true;
    } else {
      return false;
    }
  } catch (error) {
   return 0;
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
  const assignment = await Assignment.findOne({ where: { id } });
  if (!assignment) {
    throw new Error("Assignment not found");
  }
  return assignment;
};
