import { router } from "./infra/router";
import { Router } from "express";

export class AppRouter {
  readonly router: Router;
  constructor() {
    this.router = router;
  }
}