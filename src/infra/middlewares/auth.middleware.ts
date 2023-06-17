import { Request, Response, NextFunction } from "express";
import { BaseMiddleware } from "./base-middleware";
import jwt from "jsonwebtoken";

class AuthMiddleware implements BaseMiddleware {
  constructor() {
    console.log("AuthMiddleware instantiated");
  }

  register(publicRoutes: string[]): (req: Request, res: Response, next: NextFunction) => void {
    return (req, res, next) => {
      // exclude public routes
      console.log(publicRoutes, req.path)
      if (publicRoutes.includes(req.path)) {
        return next();
      }
      const token = req.headers["authorization"];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      jwt.verify(token.split(" ")[1], process.env.JWT_SECRET as string, (err, decoded) => {
        if (err || !decoded) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        req.body.userId = decoded.id;
        next();
      });
    };
  }
}

export default new AuthMiddleware();
