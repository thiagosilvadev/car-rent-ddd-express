import { AppRouter } from './app-router';
import {
  app,
} from './infra/express';

import { Express } from 'express';
import { appRouter } from './routes';

export class App {
    app: Express;
    router: AppRouter;
    constructor() {
        this.app = app;
        this.router = appRouter
        this.app.use(this.router.router);
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }
 
}