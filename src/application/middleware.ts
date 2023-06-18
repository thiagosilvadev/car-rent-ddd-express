import { Request, Response, NextFunction } from "express";
import { Application } from "./app";

export interface Middleware<T = any, R = any> {
  app: Application<T, R>;
  register(): (req: Request, res: Response, next: NextFunction) => void;
}
