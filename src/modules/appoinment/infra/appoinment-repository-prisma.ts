import { prisma } from "@/infra/database/prisma.client";
import { Appoinment } from "../domain/appoinment.entity";
import { AppoinmentRepository } from "../domain/appoinment.repository";
import AppoinmentMapper from "./mappers/appoinment.mapper";
import { Prisma } from "@prisma/client";

export class AppoinmentRepositoryPrisma implements AppoinmentRepository {
  async save(entity: Appoinment): Promise<void> {
    const appoinment = AppoinmentMapper.toPersistence(entity);
    await prisma.appoinment.create({
      data: appoinment,
    });
  }
  async delete(id: string): Promise<void> {
    await prisma.appoinment.delete({
      where: {
        id,
      },
    });
  }
  async update(entity: Appoinment): Promise<void> {
    await prisma.appoinment.update({
      where: {
        id: entity.id,
      },
      data: AppoinmentMapper.toPersistence(entity),
    });
  }
  async findById(id: string): Promise<Appoinment | null> {
    const appoinment = await prisma.appoinment.findUnique({
      where: {
        id,
      },
    });

    if (!appoinment) {
      return null;
    }

    return AppoinmentMapper.toDomain(appoinment);
  }
  async findAll(): Promise<Appoinment[]> {
    const appoinments = await prisma.appoinment.findMany();

    return appoinments.map(AppoinmentMapper.toDomain);
  }
  async where(
    conditions: Partial<Record<keyof Appoinment, unknown>>
  ): Promise<Appoinment[]> {
    const appoinments = await prisma.appoinment.findMany({
      where: this.parseWhere(conditions),
    });

    return appoinments.map(AppoinmentMapper.toDomain);
  }

  private parseWhere(
    conditions: Partial<Record<keyof Appoinment, unknown>>
  ): Prisma.AppoinmentWhereInput {
    const { id, carId, userId, start, end, totalPrice } = conditions;
    return {
      id,
      carId,
      userId,
      start,
      end,
      totalPrice,
    } as Prisma.AppoinmentWhereInput;
  }
}
