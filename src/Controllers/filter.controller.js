import { Task } from "../Models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const Search = asyncHandler(async (req, res) => {
  try {
    const { userID, value } = req.body;

    const userTaskList = await Task.find({ userID: userID });

    const searchResult = userTaskList?.filter((taskname) =>
      taskname.taskheading.toLowerCase().includes(value.toLowerCase())
    );

    return res.status(200).json({
      status: 200,
      searchResult,
    });
  } catch (error) {
    console.log("Error , Failed to search", error);
  }
});

const filterTasks = asyncHandler(async (req, res) => {
  try {
    const { status, userID } = req.body;

    const userTaskList = await Task.find({ userID: userID });

    if (status === "TODO") {
      const taskList = userTaskList?.filter(
        (taskname) => taskname.status === "TODO"
      );

      return res.status(200).json({
        status: 200,
        message: "results fetched successfully",
        taskList,
      });
    } else if (status === "PROGRESS") {
      const taskList = userTaskList?.filter(
        (taskname) => taskname.status === "PROGRESS"
      );

      return res.status(200).json({
        status: 200,
        message: "results fetched successfully",
        taskList,
      });
    } else if (status === "DONE") {
      const taskList = userTaskList?.filter(
        (taskname) => taskname.status === "DONE"
      );

      return res.status(200).json({
        status: 200,
        message: "results fetched successfully",
        taskList,
      });
    }
  } catch (error) {
    console.log("Error while filtering out the task list", error);
  }
});

export { Search, filterTasks };
