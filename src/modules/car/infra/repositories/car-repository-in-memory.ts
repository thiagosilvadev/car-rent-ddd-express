import { Car, CarProps } from "../../domain/car.entity";
import { CarRepository } from "../../domain/car.repository";
import fs from "fs";

export class CarRepositoryInMemory implements CarRepository {
  private cars: Car[] = [];
  private filePath: string = "./cars.json"; // Path to the JSON file

  constructor() {
    this.loadCarsFromJson(); // Load cars from JSON file when the repository is instantiated
  }

  private saveCarsToJson(): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.filePath, JSON.stringify(this.cars), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  private loadCarsFromJson(): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, "utf8", (err, data) => {
        if (err) {
          resolve();
        } else {
          try {
            this.cars = JSON.parse(data);
            resolve();
          } catch (err) {
            reject(err);
          }
        }
      });
    });
  }

  findByPlate(plate: string): Promise<Car | null> {
    return Promise.resolve(
      this.cars.find((car) => car.plate === plate) || null
    );
  }

  findAllAvailable(): Promise<Car[]> {
    return Promise.resolve(this.cars.filter((car) => car.isAvailable));
  }

  save(entity: Car): Promise<void> {
    this.cars.push(entity);
    return this.saveCarsToJson();
  }

  delete(id: string): Promise<void> {
    this.cars = this.cars.filter((car) => car.id !== id);
    return this.saveCarsToJson();
  }

  update(entity: Car): Promise<void> {
    this.cars = this.cars.map((car) => (car.id === entity.id ? entity : car));
    return this.saveCarsToJson();
  }

  findById(id: string): Promise<Car | null> {
    return Promise.resolve(this.cars.find((car) => car.id === id) || null);
  }

  findAll(): Promise<Car[]> {
    return Promise.resolve(this.cars);
  }

  where(conditions: Partial<Record<keyof Car, unknown>>): Promise<Car[]> {
    const filtered = this.cars.filter((car) => {
      for (const key in conditions) {
        if (
          conditions[key as keyof typeof conditions] !== undefined &&
          conditions[key as keyof typeof conditions] !==
            String(car[key as keyof typeof conditions])
        ) {
          return false;
        }
      }
      return true;
    });

    return Promise.resolve(filtered);
  }
}
