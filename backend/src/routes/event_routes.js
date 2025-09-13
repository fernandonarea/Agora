import { Router } from "express";
import { verifyToken} from "../middleware/auth.js";
import { createEvent, deleteEvent, getEventById, getEvents, updateEvent } from "../controllers/event_controller.js";

const event_routes = new Router();

event_routes.get("/api/event/getEvents", verifyToken, getEvents);
event_routes.get("/api/event/getEventById/:id_event", verifyToken, getEventById);

event_routes.post("/api/event/createEvent/:event_owner", verifyToken, createEvent);

event_routes.put("/api/event/updateEvent/:id_event", verifyToken, updateEvent);
event_routes.delete("/api/event/deleteEvent/:id_event", verifyToken, deleteEvent);

export default event_routes;