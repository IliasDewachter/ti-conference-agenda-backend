import express from 'express';
import logger from 'morgan';
import { eventsController } from './controllers';

const port = 3001;

const app = express();

app.use(logger('dev'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());

app.use(eventsController);

app.listen(port, () => {
    console.log("Server is up and running on port " + port);
});