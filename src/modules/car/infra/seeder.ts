import { faker } from "@faker-js/faker";
import { Car } from "../domain/car.entity";
import { CarRepository } from "../domain/car.repository";

export const carSeeder = async (
  carRepository: CarRepository,
  amount: number
) => {
  return Promise.all(
    Array.from({ length: amount }).map(async (_, index) => {
      const car = Car.create({
        plate: `ABC-123${index}`,
        model: faker.vehicle.model(),
        brand: faker.vehicle.manufacturer(),
        year: faker.date.past().getFullYear(),
        color: faker.vehicle.color(),
        price: faker.number.float({ min: 10000, max: 100000 }),
        isAvailable: faker.datatype.boolean(),
      })

      await carRepository.save(car);
    })
  );
};
