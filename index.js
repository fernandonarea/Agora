import express from 'express'
import cors from 'cors'
import { PORT, config_core } from './src/config/config.js';

//ROUTES
import user_routes from './src/routes/user_routes.js';
import event_routes from './src/routes/event_routes.js';
import likes_routes from './src/routes/likes_routes.js';
import comments_routes from './src/routes/comments_routes.js';

//SOCKET IO
import {Server} from 'socket.io';
import {createServer} from 'node:http'



const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: config_core.application.cors.server.origin,
        credentials: config_core.application.cors.server.credentials
    }
});

io.on('connection', (socket) => {
    console.log("An user has connected")

    socket.on('disconnect', () => {
        console.log("An user has disconnected")
    })
})

app.use(cors({
    origin: config_core.application.cors.server.origin,
    credentials: config_core.application.cors.server.credentials
}));

app.use(express.json());

app.use(user_routes);
app.use(event_routes);
app.use(likes_routes);
app.use(comments_routes);

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
})

app.use((req, res, next) => {
    res.status(404).json({message: 'Ruta no válida'});
});

server.listen(PORT, () => {console.log('Servidor escuchando en el puerto ' + PORT);})