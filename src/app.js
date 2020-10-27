// Imports

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes'
require('dotenv').config();
import {createRoles} from './libs/initialSetup';

// Database Connection

require('./database');

// Inicializations

const app = express(); 
createRoles(); 

// Settings

app.set('port', process.env.PORT || 3000);

// Middlewares

app.use(express.json());
app.use(morgan('dev'));
app.use(cors()); 

// Routes

app.use('/api', router);

// Static Files

app.use(express.static(__dirname + "/public"))

// Start the Server

app.listen(app.get('port'), () => {
    console.log('Server on port: ', app.get('port'));
});

