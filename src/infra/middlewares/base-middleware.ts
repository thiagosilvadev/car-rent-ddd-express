import { Request, Response, NextFunction } from 'express';


export interface BaseMiddleware {
  register(publicRoutes: string[]): (req: Request, res: Response, next: NextFunction) => void;
}