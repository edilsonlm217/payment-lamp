import express from 'express';
import cors from 'cors';
import http from 'http';
import routes from './routes';

import {
    GetPagSeguroApp,
    CreateApplicationAtPagSeguro,
    CreatePagSegurpAppOnDatabase
} from './database/procedures';

import './database';
import './jobs';

class App {
    constructor() {
        this.app = express();
        this.server = http.Server(this.app);

        this.middlewares();
        this.routes();
        this.pagseguro();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(routes);
    }

    async pagseguro() {
        const pagSeguroAppExists = await GetPagSeguroApp();
        if (!pagSeguroAppExists) {
            const response = await CreateApplicationAtPagSeguro();
            await CreatePagSegurpAppOnDatabase(response.data);
        }
    }
}

export default new App().server;
