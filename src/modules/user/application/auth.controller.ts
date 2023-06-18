import { Request, Response } from "express";
import Controller from "@/utils/controller.decorator";
import { UserService } from "./user.service";
import { Post } from "@/utils/handlers.decorator";
import { UserRepositoryPrisma } from "../infra/user-repository-prisma";
import { CreateUserDTO } from "./dto/create-user.dto";

const repo = new UserRepositoryPrisma();
@Controller("/auth")
export class AuthController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService(repo);
  }
  @Post("/login", {
    isPublic: true,
  })
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this.userService.login(email, password);
    res.json({ token });
  }

  @Post("/signup", {
    isPublic: true,
  })
  async create(request: Request, response: Response) {
    try {
      await this.userService.createUser(CreateUserDTO.parse(request.body));
      return response.status(201).json({ message: "User created" });
    } catch (error) {
      const { message } = error as Error;
      return response.status(500).json({ error: message });
    }
  }
}
