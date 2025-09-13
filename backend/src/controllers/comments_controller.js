import { db_pool_connection } from "../database/db.js";
import { 
    response_bad_request, 
    response_created, 
    response_error, 
    response_not_found, 
    response_succes, 
    } 
from "../Responses/responses.js";

export const addComment = async (req, res) => {
    const {id_event} = req.params;
    const {comment} = req.body;
    const id_user = req.user.id_user;

    try {
        const [rows] = await db_pool_connection.query("INSERT INTO comments (id_event, id_user, comment) VALUES (?,?,?)",
            [id_event, id_user, comment]
        );

        if(rows.affectedRows === 0){
            return res.status(400).json(response_bad_request("No se pudo añadir el comentario"));
        }

        if (!comment || comment.trim() === "") {
            return res.status(400).json(response_bad_request("El comentario no puede estar vacío"));
        }
        
        res.status(201).json(response_created({id_comment: rows.insertId}, "Haz comentado esta publicacion"));

    } catch (error) {
        return res.status(500).json(response_error(500,"Error en el servidor, intente nuevamente, " + error['sqlMessage']))
    }
}

export const getEventComments = async (req, res) => {
    const {id_event} = req.params;

    try {
        const [rows] = await db_pool_connection.query(`
            SELECT c.id_comment, c.comment, c.created_at, u.id_user, u.user_name, u.user_lastname, u.profile_photo
            FROM comments c
            INNER JOIN users u ON c.id_user = u.id_user
            WHERE c.id_event = ?
            ORDER BY c.created_at asc;`, 
            [id_event]
        );

        if(rows.length === 0){
            return res.status(404).json(response_not_found("No se encontraron comentarios"));
        }

        res.status(200).json(response_succes(rows[0], "Comentarios obtenidos con exito"));

    } catch (error) {
        return res.status(500).json(response_error(500,"Error en el servidor, intente nuevamente, " + error['sqlMessage']))
    }
}

export const getEventTotalComments = async (req, res) => {
    const {id_event} = req.params;

    try {
        const [rows] = await db_pool_connection.query("SELECT COUNT(*) AS total_comments FROM comments WHERE id_event = ?", [id_event]);

        res.status(200).json(response_succes(rows, "Numero de comentarios obtenidos con exito"));

    } catch (error) {
        return res.status(500).json(response_error(500,"Error en el servidor, intente nuevamente, " + error['sqlMessage']))
    }
}

export const updateComment = async (req, res) => {
    const {id_comment} = req.params;
    const {comment} = req.body;

    try {
        const [rows] = await db_pool_connection.query(`
            UPDATE comments SET
                comment = COALESCE(?, comment)
            WHERE id_comment = ?`,
            [comment, id_comment]
        );

        if(rows.affectedRows === 0 ){
            return res.status(400).json(response_bad_request("No se pudo actualizar el comentario"));
        }
        
        if (!comment || comment.trim() === "") {
            return res.status(400).json(response_bad_request("El comentario no puede estar vacío"));
        }

        res.status(200).json(response_succes(rows, "Comentario actualizado con exito"));

    } catch (error) {
        return res.status(500).json(response_error(500,"Error en el servidor, intente nuevamente, " + error['sqlMessage']))
    }
}

export const deleteComment = async (req, res) => {
    const {id_comment} = req.params;

    try {
        const [rows] = await db_pool_connection.query("DELETE FROM comments WHERE id_comment = ?", [id_comment]);

        if(rows.affectedRows === 0){
            return res.status(400).json(response_bad_request("No se pudo eliminar el comentario"));
        }

        res.status(200).json(response_succes(rows, "Comentario eliminado con exito"));

    } catch (error) {
        return res.status(500).json(response_error(500,"Error en el servidor, intente nuevamente, " + error['sqlMessage']))
    }
}