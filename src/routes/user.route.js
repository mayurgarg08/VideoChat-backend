import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  acceptFriendRequest,
  addMessageNotification,
  getFriendRequests,
  getMyFriends,
  getOutgoingFriendReqs,
  getRecommendedUsers,
  sendFriendRequest,
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", protectRoute, sendFriendRequest);

router.put("/friend-request/:id/accept", acceptFriendRequest);
router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);
router.post("/message-notification", addMessageNotification);
router.get("/notifications", getNotifications);
router.patch("/notifications/mark-all-read", markAllNotificationsRead);
router.patch("/notifications/:id/read", markNotificationRead);

export default router;
