import { Mapper } from "@/domain/mapper";
import { Car as CarPrisma } from "@prisma/client";
import { Car } from "../../domain/car.entity";
export class CarMapper implements Mapper<Car, CarPrisma> {
  toDomain({  id, ...raw }: CarPrisma): Car {
    const car = Car.create(
      {
        ...raw,
      },
     id
    );

    return car;
  }
  toPersistence(entity: Car): CarPrisma {
    return {
      id: entity.id,
      plate: entity.plate,
      model: entity.model,
      brand: entity.brand,
      year: entity.year,
      color: entity.color,
      price: entity.price,
      isAvailable: entity.isAvailable,
    };
  }
  toDTO(entity: Car) {
    throw new Error("Method not implemented.");
  }
}

export default new CarMapper();
