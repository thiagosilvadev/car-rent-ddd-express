import { Request, Response } from "express";
import Controller from "../../../utils/controller.decorator";
import { UserRepositoryInMemory } from "../infra/user-repository-in-memory";
import { UserService } from "./user.service";
import { Post } from "../../../utils/handlers.decorator";


const repo = new UserRepositoryInMemory();
@Controller("/auth")
export class AuthController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService(repo);
  }
  @Post("/login")
  async login(req: Request, res: Response) { 
    const { email, password } = req.body;
    const token = await this.userService.login(email, password);
    res.json({ token });
  }

  @Post("/signup")
  async create(request: Request, response: Response) {
    const { email, name, lastName, password } = request.body;
    await this.userService.createUser(email, password, name, lastName);
    return response.status(201).json({ message: "User created" });
  }
  
}