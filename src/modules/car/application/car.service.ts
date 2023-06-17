import { Car } from "../domain/car.entity";
import { CarRepository } from "../domain/car.repository";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDTO } from "./dto/update-car.dto";

export class CarService {
  constructor(private readonly carRepository: CarRepository) {}

  public async findAll(): Promise<Car[]> {
    return await this.carRepository.findAll();
  }

  public async findBy(query: any): Promise<Car[]> {
    return await this.carRepository.where(query);
  }

  public async findByPlate(plate: string): Promise<Car | null> {
    return await this.carRepository.findByPlate(plate);
  }

  public async create(request: CreateCarDto): Promise<Car> {
    const carAlreadyExists = await this.carRepository.findByPlate(
      request.value.plate
    );
    if (carAlreadyExists) {
      throw new Error("Car already exists");
    }
    const car = Car.create({ ...request.value, isAvailable: true });
    await this.carRepository.save(car);
    return car;
  }

  public async update(plate: string, { value }: UpdateCarDTO): Promise<Car> {
    const car = await this.carRepository.findByPlate(plate);
    if (!car) {
      throw new Error("Car not found");
    }
    const updatedCar = car.update(value);
    await this.carRepository.update(updatedCar);
    return updatedCar;
  }

  public async delete(plate: string): Promise<void> {
    const car = await this.carRepository.findByPlate(plate);
    if (car) {
      await this.carRepository.delete(car.id);
    }
  }
}
