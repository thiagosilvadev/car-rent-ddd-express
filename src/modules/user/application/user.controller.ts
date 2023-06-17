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
  @Post("")
  async create(request: Request, response: Response) {
    const { email, name, lastName, password } = request.body;
    await this.userService.createUser(email, password, name, lastName);
    return response.status(201).json({ message: "User created" });
  }

}