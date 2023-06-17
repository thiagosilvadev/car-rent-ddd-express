import { Car, CarProps } from "../../domain/car.entity";
import { CarRepository } from "../../domain/car.repository";

export class CarRepositoryInMemory implements CarRepository {
  private cars: Car[] = [];
  findByPlate(plate: string): Promise<Car | null> {
    return Promise.resolve(this.cars.find((car) => car.plate === plate) || null);
  }
  findAllAvailable(): Promise<Car[]> {
    return Promise.resolve(this.cars.filter((car) => car.isAvailable));
  }
  save(entity: Car): Promise<void> {
    this.cars.push(entity);
    return Promise.resolve();
  }
  delete(id: string): Promise<void> {
    this.cars = this.cars.filter((car) => car.id !== id);
    return Promise.resolve();
  }
  update(entity: Car): Promise<void> {
    this.cars = this.cars.map((car) => (car.id === entity.id ? entity : car));
    return Promise.resolve();
  }
  findById(id: string): Promise<Car | null> {
    return Promise.resolve(this.cars.find((car) => car.id === id) || null);
  }
  findAll(): Promise<Car[]> {
    return Promise.resolve(this.cars);
  }
  where(conditions: Partial<Record<keyof Car, unknown>>): Promise<Car[]> {
    return Promise.resolve(
      this.cars.filter((car) =>
        Object.entries(conditions).every(([key, value]) => car[key as keyof CarProps] === value)
      )
    );
  }
}