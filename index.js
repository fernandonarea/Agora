import express from 'express'
import cors from 'cors'
import { PORT, config_core } from './src/config/config.js';

const app = express();

app.use(cors({
    origin: config_core.application.cors.server.origin,
    credentials: config_core.application.cors.server.credentials
}));

app.use(express.json);

app.use((req, res, next) => {
    res.status(404).json({message: 'Ruta no válida'});
});

app.listen(PORT, () => {console.log('Servidor escuchando en el puerto ' + PORT);})