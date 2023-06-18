import { prisma } from "@/infra/database/prisma.client";
import { Car } from "../../domain/car.entity";
import { CarRepository } from "../../domain/car.repository";
import CarMapper from "../mappers/car.mapper";
import { Prisma } from "@prisma/client";

export class CarRepositoryPrisma implements CarRepository {
  async findByPlate(plate: string): Promise<Car | null> {
    const car = await prisma.car.findUnique({
      where: {
        plate,
      },
    });
    if (!car) {
      return null;
    }
    return CarMapper.toDomain(car);
  }
  async findAllAvailable(): Promise<Car[]> {
    const carsAvailable = await prisma.car.findMany({
      where: {
        isAvailable: true,
      },
    });
    return carsAvailable.map(CarMapper.toDomain);
  }

  async save(entity: Car): Promise<void> {
    const car = CarMapper.toPersistence(entity);
    await prisma.car.create({
      data: car,
    });
  }
  async delete(id: string): Promise<void> {
    await prisma.car.delete({
      where: {
        id,
      },
    });
  }
  async update(entity: Car): Promise<void> {
    await prisma.car.update({
      where: {
        id: entity.id,
      },
      data: CarMapper.toPersistence(entity),
    });
  }
  async findById(id: string): Promise<Car | null> {
    const car = await prisma.car.findUnique({
      where: {
        id,
      },
    });

    if (!car) {
      return null;
    }

    return CarMapper.toDomain(car);
  }
  async findAll(): Promise<Car[]> {
    const cars = await prisma.car.findMany();
    return cars.map(CarMapper.toDomain);
  }
  async where(conditions: Partial<Record<keyof Car, unknown>>): Promise<Car[]> {
    const cars = await prisma.car.findMany({
      where: this.parseWhereConditions(conditions),
    });

    return cars.map(CarMapper.toDomain);
  }

  private parseWhereConditions(
    conditions: Partial<Record<keyof Car, unknown>>
  ): Prisma.CarWhereInput {
    const { brand, color, isAvailable, model, plate, price, year, id } =
      conditions;
    return {
      brand,
      color,
      isAvailable,
      model,
      plate,
      price,
      year,
      id,
    } as Prisma.CarWhereInput;
  }
}
