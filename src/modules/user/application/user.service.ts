import { User } from "../domain/entities/user.entity";
import { UserRepository } from "../domain/user.repository";
import { CreateUserDTO } from "./dto/create-user.dto";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async createUser(request: CreateUserDTO): Promise<User> {
    const { email, password, name, lastName } = request.value;
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new Error("User already exists");
    }

    const user = await User.create({
      email,
      password,
      name,
      lastName,
    });
    await this.userRepository.save(user);

    return user;
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = await user.password.compare(password);
    if (!isPasswordCorrect) {
      throw new Error("Password is incorrect");
    }

    const token = user.generateToken();
    return token;
  }
}
