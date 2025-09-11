import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { addLike, deleteLike, getEventLikes } from "../controllers/likes_controller.js";

const likes_routes = new Router();

likes_routes.get("/api/likes/getLikes/:id_event", verifyToken, getEventLikes);

likes_routes.post("/api/likes/addLike", verifyToken, addLike);

likes_routes.delete("/api/likes/deleteLike", verifyToken, deleteLike);

export default likes_routes;