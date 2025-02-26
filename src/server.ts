// =================IMPORTS START======================//
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import csurf from 'csurf';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { environment } from './config';
import routes from './routes';
import { ValidationError } from 'sequelize';


import router from '@routes/routes';
import logger from '@utils/logger';
import { DB } from '@database/index';
import { PORT } from './config';
import { errorHandler } from './utils/error-handler';
import { swaggerSpec, swaggerUi } from './utils/swagger';



// =================VARIABLES START======================//

const isProduction = environment === 'production';
const isDevelopment = environment === 'development';
const isTesting = environment === 'testing';

const appServer = express();
const port = PORT;

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};


// =================MIDDLE WARE START======================//


// morgan and cookieParser
appServer.use(morgan('dev'));
appServer.use(cookieParser());


// Enable CORS if productions
if (!isProduction) {
    appServer.use(cors(corsOptions));
    appServer.options('*', cors(corsOptions));
}


// helmet and csurf
appServer.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
appServer.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true,
        },
    })
);


// routes
appServer.use(routes);


// Middleware for parsing JSON and URL-encoded bodies
appServer.use(express.json());
appServer.use(express.urlencoded({ extended: true }));

appServer.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Use the router with the /api prefix
appServer.use('/api', router);
appServer.use(errorHandler);

appServer.all('*', (req, res) => {
    res.status(404).json({ message: 'Sorry! Page not found' });
});




// =================ROUTES START======================//


appServer.use((req, res, next) => {
    const startTime = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - startTime;
        const message = ;

        if (res.statusCode >= 500) {
            logger.error(message);
        } else if (res.statusCode >= 400) {
            logger.warn(message);
        } else {
            logger.info(message);
        }
    });

    next();
});






appServer.use((_req, _res, next) => {
    const err: any = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

appServer.use((err: any, _req, _res, next) => {
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error';
    }
    next(err);
});

appServer.use((err: any, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});




// =================SEQUELIZE CONNECT START======================//


DB.sequelize
    .authenticate()
    .then(() => {
        logger.info('Database connected successfully!');
        appServer.listen(port, () => {
            logger.info();
        });
    })
    .catch(error => {
        logger.error('Unable to connect to the database:', error);
    });



export default appServer;
