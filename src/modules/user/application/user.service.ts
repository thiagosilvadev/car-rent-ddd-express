import { User } from "../domain/entities/user.entity";
import { UserRepository } from "../domain/user.repository";

export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ){
    console.log("UserService instantiated");
  }

  public async createUser(
    email: string,
    password: string,
    name: string,
    lastName: string,
  ): Promise<User> {
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
}