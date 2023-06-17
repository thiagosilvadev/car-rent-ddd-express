// src/application.ts
import express, { Application as ExApplication, Handler } from "express";
import { AppConfig } from "./application/app.config";
import { MetadataKeys } from "./utils/metadata.keys";
import { IRouter } from "./utils/handlers.decorator";
import { BaseMiddleware } from "./infra/middlewares/base-middleware";

type RouteInfo = {
  api: string;
  handler: string;
}
class Application {
  private readonly _instance: ExApplication;
  public publicRoutes: RouteInfo[] = [];
  public routerInfo: RouteInfo[] = [];
  get instance(): ExApplication {
    return this._instance;
  }
  constructor() {
    this._instance = express();
    this._instance.use(express.json());
    this.registerMiddlewares(AppConfig.middlewares);
    this.registerRouters(AppConfig.publicControllers, (routes) => this.publicRoutes = routes);
    this.registerRouters(AppConfig.controllers, (routes) => this.routerInfo = routes);
  }
  private registerRouters(controllers: Array<new () => any>, cb: (routerInfo: Array<{ api: string; handler: string }>) => void) {
    const routerInfo: Array<{ api: string; handler: string }> = [];

    controllers.forEach((controllerClass) => {
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

      routers.forEach(({ method, path, handlerName }) => {
        exRouter[method](
          path,
          controllerInstance[String(handlerName)].bind(controllerInstance)
        );

        routerInfo.push({
          api: `${method.toLocaleUpperCase()} ${basePath + path}`,
          handler: `${controllerClass.name}.${String(handlerName)}`,
        });
      });

      this._instance.use(basePath, exRouter);
      cb(routerInfo)
    });
  }

  private registerMiddlewares(middlewares: Array<BaseMiddleware>) {
    middlewares.forEach((middleware) => {
      console.log(middleware)
      this._instance.use(middleware.register(this.publicRoutes.map(r => r.api.split(" ")[1])));
    });
  }
}
export default new Application();
