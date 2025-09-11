import { db_pool_connection } from "../database/db.js";
import { 
    response_bad_request, 
    response_created, 
    response_error, 
    response_not_found, 
    response_succes, 
    } 
from "../Responses/responses.js";

export const createEvent = async (req, res) => {
    try {
        const event_owner = req.params;
        const {event_name, event_description, event_schedule, event_status} = req.body;

        const [rows] = await db_pool_connection.query(`INSERT INTO events (event_name, event_description, event_schedule, event_status, event_owner) 
            VALUES (?,?,?,?,?)`,[event_name, event_description, event_schedule, event_status, event_owner]
        );
        
        if(rows.affectedRows === 0){
            return res.status(400).json(response_bad_request("No se puedo crear el evento"));
        }
        res.status(201).json(response_created(rows, "Evento creado con exito"))

    } catch (error) {
        return res.status(500).json(response_error(500, "Error en el servidor, intente nuevamente " + error))
    }
}

export const getEvents = async (req, res) => {
    try {
        const [rows] = await db_pool_connection.query('SELECT * FROM events');

        if(rows.length === 0){
            return res.status(400).json(response_bad_request("No hay eventos todavía..."));
        }
        res.status(200).json(response_created(rows, "Eventos creados hasta el momento"))

    } catch (error) {
        return res.status(500).json(response_created(500, "Error en el servidor, intente nuevamente " + error))
    }
}

export const getEventById = async (req, res) => {
    try {
        const {id_event} = req.params;

        const [rows] = await db_pool_connection.query(`
            SELECT event_name, event_description, event_create_at, event_schedule, 
            event_status, event_owner FROM events WHERE id_event = ?`,
            [id_event]
        );

        if(rows.length === 0){
            return res.status(404).json(response_not_found("No se pudo econtrar el evento"))
        }
        res.status(200).json(response_succes(rows, "Evento encontrado con exito"))
    } catch (error) {
        return res.status(500).json(response_error(500, "Error en el servidor intente nuevamente " + error))
    }
}

export const updateEvent = async (req, res) => {
    try {
        const id_event = req.params;
        const {event_name, event_description, event_schedule, event_status} = req.body;

        const [rows] = await db_pool_connection.query(`
            UPDATE events SET
                event_name = COALESCE(?, event_name),
                event_description = COALESCE(?, event_description),
                event_schedule = COALESCE(?, event_schedule),
                event_status = COALESCE(?, event_status)
            WHERE id_event = ?`,
            [event_name, event_description, event_schedule, event_status, id_event]
        );

        if(rows.affectedRows === 0){
            return res.status(404).json(response_not_found("No se pudo actualizar el evento, evento no encontrado"))
        }
        res.status(200).json(response_succes(rows, "Evento actualizado con éxito"))

    } catch (error) {
        return res.status(500).json(response_error(500, "Error en el servidor intente nuevamente " + error))
    }
}

export const deleteEvent = async (req, res) => {
    try {
        const id_event = req.params;

        const [rows] = await db_pool_connection.query('DELETE FROM events WHERE id_event = ?', [id_event])

        if(rows.affectedRows === 0){
            return res.status(404).json(response_not_found("No se pudo eliminar el evento, evento no encontrado o ID incorrecto"))
        }

        res.status(200).json(response_succes(rows, "Evento eliminado con exito"))

    } catch (error) {
        return res.status(500).json(response_error(500, "Error en el servidor intente nuevamente " + error))
    }
}