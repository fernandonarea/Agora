import { db_pool_connection } from "../database/db.js";
import { 
    response_bad_request, 
    response_created, 
    response_error, 
    response_succes, 
    } 
from "../Responses/responses.js";

export const addLike = async (req, res) => {
    
    const {id_user, id_event} = req.body;
    
    try {
        const [result] = await db_pool_connection.query('INSERT INTO likes(id_user, id_event) VALUES (?,?)', [id_user, id_event])

        if(result.affectedRows === 0){
            return res.status(400).json(response_bad_request("No se puedo dar like al evento"));
        }

        res.status(201).json(response_created(201, "Haz dado like a la publicación"));

    } catch (error) {
        
        if(error.code == "ER_DUP_ENTRY"){
            return res.status(400).json(response_bad_request("Ya tienes un like en este evento"))
        }

        return res.status(500).json(response_error(500,"Error en el servidor, intente nuevamente, " + error['sqlMessage']))
    }
}

export const getEventLikes = async (req, res) => {
    
    const {id_event} = req.params;

    try {
        
        const [result] = await db_pool_connection.query('SELECT COUNT(*) AS total_likes FROM likes WHERE id_event = ?', [id_event]);

        res.status(200).json(response_succes(result, "Número de likes obtenidos con exito"))

    } catch (error) {
        return res.status(500).json(response_error(500,"Error en el servidor, intente nuevamente, " + error['sqlMessage']))
    }

}

export const deleteLike = async (req, res) => {
    const {id_event, id_user} = req.body;
    
    try {
        
        const [result] = await db_pool_connection.query("DELETE FROM likes WHERE id_user = ? AND id_event = ?", [id_user, id_event]);

        if(result.affectedRows === 0){
            return res.status(400).json(response_bad_request("Error al eliminar el like"));
        }
        res.status(200).json(response_succes(result, "Like eliminado con exito"))

    } catch (error) {
        return res.status(500).json(response_error(500,"Error en el servidor, intente nuevamente, " + error['sqlMessage']))
    }
}