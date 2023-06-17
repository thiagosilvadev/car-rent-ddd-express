import { Request, Response } from "express";
import Controller from "../../../utils/controller.decorator";
import { Get, Post } from "../../../utils/handlers.decorator";
import { User } from "../domain/entities/user.entity";
import { UserService } from "./user.service";
import { UserRepositoryInMemory } from "../infra/user-repository-in-memory";

const repo = new UserRepositoryInMemory();


@Controller("/users")
export class UserController {
  private readonly userService: UserService = new UserService(repo);
  constructor() {
    console.log("UserController instantiated");
  }

  @Get("")
  async index(request: Request, response: Response) {
    const users = await this.userService.findAll();
    return response.json(users);
  }
}