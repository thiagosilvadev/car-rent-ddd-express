import { Request, Response } from "express";
import Controller from "../../../utils/controller.decorator";
import { Get, Post } from "../../../utils/handlers.decorator";
import { UserService } from "./user.service";
import { UserRepositoryInMemory } from "../infra/user-repository-in-memory";

const repo = new UserRepositoryInMemory();

@Controller("/users")
export class UserController {
  private readonly userService: UserService = new UserService(repo);
  @Get()
  async index(request: Request, response: Response) {
    return response.json({
      message: "Hello world",
    })
  }
}
