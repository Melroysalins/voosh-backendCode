import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    taskheading: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "TODO",
    },
    taskTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
