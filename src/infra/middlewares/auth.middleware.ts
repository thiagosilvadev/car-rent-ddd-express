import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Application } from "@/application/app";
import { Middleware } from "@/application/middleware";

export class AuthMiddleware implements Middleware {
  app: Application<any, any>;
  publicRoutes: string[];

  constructor(app: Application<any, any>) {
    this.app = app;
    this.publicRoutes = this.app.routes.filter((route) => route.isPublic).map((route) => route.path);
  }

  register(): (req: Request, res: Response, next: NextFunction) => void {
    return (req, res, next) => {
      if (this.publicRoutes.includes(req.path)) {
        return next();
      }
      const token = req.headers["authorization"];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      jwt.verify(
        token.split(" ")[1],
        process.env.JWT_SECRET,
        (err, decoded) => {
          if (err || !decoded) {
            return res.status(401).json({ message: "Unauthorized" });
          }
          // @ts-ignore
          req.body.userId = decoded.id;
          next();
        }
      );
    };
  }
}
