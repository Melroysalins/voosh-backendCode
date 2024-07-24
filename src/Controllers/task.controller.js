import { Task } from "../Models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const taskCreation = asyncHandler(async (req, res) => {
  try {
    const { userID, taskheading, description } = req.body;

    const taskTime = new Date();

    if ([taskheading, description].some((field) => field?.trim() === 0)) {
      return res.status(400).json({
        status: 400,
        message: "Please fill required fields",
      });
    }

    const taskCreation = await Task.create({
      userID,
      taskheading,
      description,
      taskTime,
    });

    if (!taskCreation) {
      return res.status(400).json({
        status: 400,
        message: "Failed to create a task",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "task created successfully",
      taskCreation,
    });
  } catch (error) {
    console.log("Failed to create task", error);
  }
});

const taskView = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;

    const checkTaskExist = await Task.findById(_id);

    if (!checkTaskExist) {
      return res.status(400).json({
        status: 400,
        message: "Invalid task credentials",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Task details fetched successfully",
      checkTaskExist,
    });
  } catch (error) {
    console.log("Failed to fetch task", error);
  }
});

const taskEdit = asyncHandler(async (req, res) => {
  try {
    const { _id, taskheading, description, progress } = req.body;

    const checkTaskExist = await Task.findById(_id);

    if (!checkTaskExist) {
      return res.status(400).json({
        status: 400,
        message: "Invalid task credentials",
      });
    }

    checkTaskExist.progress = progress || checkTaskExist.taskheading;

    checkTaskExist.taskheading = taskheading || checkTaskExist.taskheading;

    checkTaskExist.description = description || checkTaskExist.description;

    await checkTaskExist.save();

    return res.status(200).json({
      status: 200,
      checkTaskExist,
      message: "task has been updated successfully",
    });
  } catch (error) {
    console.log("Error ,Failed to edit task", error);
  }
});

const taskDelete = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  const checkTaskExist = await Task.findById(_id);

  if (!checkTaskExist) {
    return res.status(400).json({
      status: 400,
      message: "Invalid task credentials",
    });
  }

  await Task.deleteOne({ _id });

  return res.status(200).json({
    status: 200,
    message: "task has been deleted successfully",
    checkTaskExist,
  });
});

const getAllTask = asyncHandler(async (req, res) => {
  try {
    const { userID } = req.body;

    const taskList = await Task.find({ userID: userID });

    if (!taskList) {
      return res.status(400).json({
        status: 400,
        message: "No task found",
        taskList,
      });
    }

    return res.status(200).json({
      status: 200,
      taskList,
    });
  } catch (error) {
    console.log("Error while getting task list");
  }
});

const taskUpdate = asyncHandler(async (req, res) => {
  try {
    const { _id, status } = req.body;

    const task = await Task.findById(_id);

    task.status = status;

    await task.save();

    return res.status(200).json({
      status: 200,
      message: "task has been updated successfully",
    });
  } catch (error) {
    console.log("Error while updating the task", error);
  }
});

export { taskCreation, taskView, taskEdit, taskDelete, getAllTask, taskUpdate };
