import { createPool } from "mysql2/promise";
import { HOST_DB, PORT_DB, USER_DB, DATABASE, PASSWORD } from "../config/config.js";

export const db_pool_connection = createPool(
    {
        host: HOST_DB,
        user: USER_DB,
        database: DATABASE,
        password: PASSWORD,
        port: PORT_DB
    }
)