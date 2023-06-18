import { AppConfig } from "./app.config";

import express, {
  Application as ExApplication,
  Router as ExRouter,
  Handler,
} from "express";
import { MetadataKeys } from "../utils/metadata.keys";
import { IRouter } from "../utils/handlers.decorator";
import { Middleware } from "./middleware";

type Route = {
  method: string;
  path: string;
  handler: string;
  isPublic: boolean;
};

export interface Application<T, R> {
  _instance: T;
  config: AppConfig;
  routes: Route[];

  registerMiddlewares(): void;
  registerControllers(): void;
}

class ApplicationImpl implements Application<ExApplication, ExRouter> {
  _instance: ExApplication;
  config: AppConfig;
  routes: Route[] = [];

  constructor() {
    this._instance = express();
    this._instance.use(express.json());
    this.config = AppConfig;
    this.listRoutes();
    this.registerMiddlewares();
    this.registerControllers();
  }

  public get instance(): ExApplication {
    return this._instance;
  }
  registerMiddlewares(): void {
    this.config.middlewares.forEach((middlewareClass) => {
      const middlewareInstance: Middleware = new middlewareClass(this);
      this._instance.use(middlewareInstance.register());
    });
  }

  listRoutes(): void {
    this.config.controllers.forEach((controllerClass) => {
      const basePath: string = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        controllerClass
      );
      const routers: IRouter[] = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        controllerClass
      );

      routers.forEach((route) => {
        this.routes.push({
          method: route.method,
          path: basePath + route.path,
          handler: `${controllerClass.name}.${String(route.handlerName)}`,
          isPublic: route.isPublic,
        });
      });
    });
  }
  registerControllers(): void {
    this.config.controllers.forEach((controllerClass) => {
      const controllerInstance: { [handleName: string]: Handler } =
        new controllerClass() as any;

      const basePath: string = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        controllerClass
      );
      const routers: IRouter[] = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        controllerClass
      );

      const exRouter = express.Router();

      routers.forEach(({ method, path, handlerName, isPublic }) => {
        exRouter[method](
          path,
          controllerInstance[String(handlerName)].bind(controllerInstance)
        );
      });

      this._instance.use(basePath, exRouter);
    });
  }
}

export const Application = new ApplicationImpl();
