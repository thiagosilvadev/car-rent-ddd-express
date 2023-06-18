import CarController from "../modules/car/application/car.controller";
import { UserController } from "../modules/user/application/user.controller";
import { AuthController } from "../modules/user/application/auth.controller";
import { AppoinmentController } from "../modules/appoinment/application/appoinment.controller";
import { Controller } from "./controller";
import { Middleware } from "./middleware";
import { LoggerMiddleware, AuthMiddleware } from "../infra/middlewares";

type Constructor<T> = new (...args: any[]) => T;

export type AppConfig = {
  port: number;
  controllers: Constructor<Controller>[];
  middlewares: Constructor<Middleware>[];
};

const AppConfig = {
  port: process.env.PORT || 3000,
  controllers: [
    AuthController,
    CarController,
    UserController,
    AppoinmentController,
  ],
  middlewares: [LoggerMiddleware, AuthMiddleware],
};
export { AppConfig };
