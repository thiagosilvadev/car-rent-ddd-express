import { Application } from "@/application/app";
import { Middleware } from "@/application/middleware";
import { NextFunction, Request, Response } from "express";

export class LoggerMiddleware implements Middleware {
  app: Application<any, any>;

  constructor(app: Application<any, any>) {
    this.app = app;
  }

  log(method: string, path: string): void {
    const date = new Date();
    console.info(`${date.toISOString()}: Request ${method} ${path}`);
  }

  register(): (req: Request, res: Response, next: NextFunction) => void {
    return (req, res, next) => {
      this.log(req.method, req.path);
      next();
    };
  }
}
