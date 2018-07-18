
import 'babel-polyfill';

import express from 'express';
import bodyParser from 'body-parser';
import db from './db';
import config from './config/config';
import users from './routes/users.routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', users);

db.connect();

app.listen(config.SERVER_PORT, () => {
    console.log('Server listening on port ' + config.SERVER_PORT + '!');
});
