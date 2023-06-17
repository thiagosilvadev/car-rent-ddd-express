import CarController from "../modules/car/application/car.controller";
import { UserController } from "../modules/user/application/user.controller";

export const controllers = [
  CarController,
  UserController
]

export class AppConfig {
  public static controllers = controllers;
}