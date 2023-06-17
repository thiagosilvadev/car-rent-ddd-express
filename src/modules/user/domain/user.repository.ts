import { Repository } from "@/application/repository";
import { User } from "./entities/user.entity";

export interface UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | undefined>;
}