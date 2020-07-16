import Express from 'express';
import http from 'http';

import database from './config/database';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes';
import { setupWebSocket } from './services/websocket';

const port = process.env.PORT || 8000;

const app = Express();

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

const server = http.createServer(app);

setupWebSocket(server);

database.connect().then(() => {
    server.listen(port);
    console.log(`Listening on port ${port}`);
})
