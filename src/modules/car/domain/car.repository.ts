import { Repository } from "../../../application/repository";
import { Car } from "./car.entity";

export interface CarRepository extends Repository<Car> {
  findByPlate(plate: string): Promise<Car | null>;
  findAllAvailable(): Promise<Car[]>;
}

