import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // <-- use 'from'
  type: { type: String, enum: ["friend_request", "friend_accept", "message"] },
  message: String,
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Notification", notificationSchema);
