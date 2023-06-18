import { prisma } from "@/infra/database/prisma.client";
import { User } from "../domain/entities/user.entity";
import { UserRepository } from "../domain/user.repository";
import UserMapper from "./mappers/user.mapper";
import { Prisma } from "@prisma/client";

export class UserRepositoryPrisma implements UserRepository {
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return undefined;
    }
    return UserMapper.toDomain(user);
  }

  async save(entity: User): Promise<void> {
    const user = UserMapper.toPersistence(entity);
    await prisma.user.create({
      data: user,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async update(entity: User): Promise<void> {
    const user = UserMapper.toPersistence(entity);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });
  }
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }
  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map(UserMapper.toDomain);
  }
  async where(
    conditions: Partial<Record<keyof User, unknown>>
  ): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: this.parseConditions(conditions),
    });

    return users.map(UserMapper.toDomain);
  }

  private parseConditions(
    conditions: Partial<Record<keyof User, unknown>>
  ): Prisma.UserWhereInput {
    const { email, id, fullName } = conditions;
    const [name, lastName] = (fullName as string)?.split(" ") ?? [];
    return {
      email: email as string | undefined,
      id: id as string | undefined,
      firstName: name as string | undefined,
      lastName: lastName as string | undefined,
    };
  }
}
