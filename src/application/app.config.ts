import { BaseMiddleware } from "../infra/middlewares/base-middleware";
import CarController from "../modules/car/application/car.controller";
import { UserController } from "../modules/user/application/user.controller";
import authMiddleware from "../infra/middlewares/auth.middleware";
import { AuthController } from "../modules/user/application/auth.controller";

export const controllers = [
  CarController,
  UserController
]

export class AppConfig {
  public static port = 3000;
  public static publicControllers = [
    AuthController
  ];
  public static controllers = controllers;
  public static middlewares: BaseMiddleware[] = [
    authMiddleware
  ];
}