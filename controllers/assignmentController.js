import { getCredentials } from "../middleware/requireLogin.js";
import * as assignmentService from "../services/assignmentService.js";

export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await assignmentService.getAllAssignments();

    res.status(200).json(assignments);
  } catch (error) {
    if (error.message === "Forbidden") {
      res.status(403).json({ error: "Forbidden" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

//-----------------------------------------------------------
export const createAssignment = async (req, res) => {
  const assignmentData = req.body;

  try {
    assignmentData.createdBy = getCredentials(req)[0];

    const assignment = await assignmentService.createAssignment(assignmentData);

    res.status(201).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//-----------------------------------------------------------
export const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const email = getCredentials(req)[0];
    console.log(email, id);
    const assignment = await assignmentService.getAssignmentById(id, email);
    console.log(assignment);
    if (!assignment) {
      res.status(403).json();
      return;
    }

    res.status(200).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//-----------------------------------------------------------
export const deleteAssignment = async (req, res) => {
  const { id } = req.params;

  const email = getCredentials(req)[0];
  try {
    const val = await assignmentService.deleteAssignmentById(id, email);
    console.log("VALUE", val);
    if (val == true) {
      res.status(204).send();
    }

    if (val == -1 || val ==-2) {
      res.status(404).send();
    }
    if (val == false) {
      res.status(403).send();
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateAssignment = async (req, res) => {
  const { id } = req.params;
  const assignmentData = req.body;
  const email = getCredentials(req)[0];
  console.log(id)
  console.log("hello")
  if (!id||id==""){
    res.status(400).json();
  }
  try {
    if (
      await assignmentService.updateAssignmentById(id, assignmentData, email)
    ) {
      res.status(204).send();
    } else {
      res.status(403).send();
    }
  } catch (error) {
    res.status(404).json();
  }
};
