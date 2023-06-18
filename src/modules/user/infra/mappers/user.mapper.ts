import { Mapper } from "@/domain/mapper";
import { User as UserPrisma } from "@prisma/client";
import { User } from "../../domain/entities/user.entity";
import { Email } from "../../domain/entities/email.vo";
import { FullName } from "../../domain/entities/fullname.vo";
import { Password } from "../../domain/entities/password.vo";

class UserMapper implements Mapper<User, UserPrisma> {
  toDomain(raw: UserPrisma): User {
    return User.restore(
      {
        email: Email.create({ value: raw.email }),
        fullName: FullName.create({
          lastName: raw.lastName,
          name: raw.firstName,
        }),
        password: Password.restore({ value: raw.password }),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id
    );
  }
  toPersistence(entity: User): UserPrisma {
    return {
      id: entity.id,
      email: entity.email.value,
      firstName: entity.fullName.name,
      lastName: entity.fullName.lastName,
      password: entity.password.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt ?? entity.createdAt,
    };
  }
  toDTO(entity: User) {
    throw new Error("Method not implemented.");
  }
}

export default new UserMapper();
