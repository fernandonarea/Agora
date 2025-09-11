import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { addComment, deleteComment, getEventComments, getEventTotalComments, updateComment } from "../controllers/comments_controller.js";

const comments_routes = new Router();

comments_routes.get("/api/comments/getComments/:id_event", verifyToken, getEventComments);
comments_routes.get("/api/comments/getTotalComments/:id_event", verifyToken, getEventTotalComments);

comments_routes.post("/api/events/:id_event/comments", verifyToken, addComment);

comments_routes.put("/api/comments/updateComment/:id_comment", verifyToken, updateComment);
comments_routes.delete("/api/comments/deleteComment/:id_comment", verifyToken, deleteComment);

export default comments_routes;