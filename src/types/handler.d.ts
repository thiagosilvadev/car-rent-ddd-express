import { Request } from "express";

export {};

declare global {
  export interface AuthenticatedRequest extends Request {
    body: {
      userId: string;
    };
  }
}
