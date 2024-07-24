import { Router } from "express";
import {
  changePassword,
  getUserInfo,
  loginUser,
  logOutUser,
  registerUser,
} from "../Controllers/user.controller.js";
import {
  getAllTask,
  taskCreation,
  taskDelete,
  taskEdit,
  taskUpdate,
  taskView,
} from "../Controllers/task.controller.js";
import { filterTasks, Search } from "../Controllers/filter.controller.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/getuser").post(getUserInfo);

router.route("/logout").post(logOutUser);

router.route("/changepassword").post(changePassword);

router.route("/task").post(taskCreation);

router.route("/getalltask").post(getAllTask);

router.route("/gettask/:_id").get(taskView);

router.route("/edittask").post(taskEdit);

router.route("/deletetask").post(taskDelete);

router.route("/updatetask").post(taskUpdate);

router.route("/search").post(Search);

router.route("/filter").post(filterTasks);

export { router };
