import express from 'express'
import cors from 'cors'
import { PORT, config_core } from './src/config/config.js';
import user_routes from './src/routes/user_routes.js';
import event_routes from './src/routes/event_routes.js';
import likes_routes from './src/routes/likes_routes.js';
import comments_routes from './src/routes/comments_routes.js';

const app = express();

app.use(cors({
    origin: config_core.application.cors.server.origin,
    credentials: config_core.application.cors.server.credentials
}));

app.use(express.json());

app.use(user_routes);
app.use(event_routes);
app.use(likes_routes);
app.use(comments_routes);

app.use((req, res, next) => {
    res.status(404).json({message: 'Ruta no válida'});
});

app.listen(PORT, () => {console.log('Servidor escuchando en el puerto ' + PORT);})