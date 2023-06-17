import { Request, Response } from "express";

import { CarRepositoryInMemory } from "../infra/repositories/car-repository-in-memory";
import { carSeeder } from "../infra/seeder";
import { Delete, Get, Post, Put } from "../../../utils/handlers.decorator";
import Controller from "../../../utils/controller.decorator";
import { CarService } from "./car.service";
import { CreateCarDto } from "./dto/create-car.dto";
import { ZodError } from "zod";
import { UpdateCarDTO } from "./dto/update-car.dto";

const repo = new CarRepositoryInMemory();
carSeeder(repo, 10);

@Controller("/cars")
export default class CarController {
  private carService: CarService;
  constructor() {
    console.log("CarController instantiated");
    this.carService = new CarService(repo);
  }

  @Get("")
  async index(request: Request, response: Response) {
    const query = request.query;
    if (Object.keys(query).length > 0) {
      const cars = await this.carService.findBy(query);
      return response.json(cars);
    }
    const cars = await this.carService.findAll();
    return response.json(cars);
  }

  @Post("")
  async create(request: Request, response: Response) {
    try {
      const car = await this.carService.create(
        CreateCarDto.parse(request.body)
      );
      return response.status(201).json(car);
    } catch (error) {
      if (error instanceof ZodError) {
        return response.status(400).json({ error: error.issues });
      }

      const { message } = error as Error;
      return response.status(500).json({ error: message });
    }
  }

  @Get("/:plate")
  async findByPlate(request: Request, response: Response) {
    const { plate } = request.params;
    const car = await this.carService.findByPlate(plate);
    if(!car) {
      return response.status(404).json({ error: "Car not found" });
    }
    return response.json(car);
  }

  @Put("/:plate")
  async update(request: Request, response: Response) {
    const { plate } = request.params;

    const car = await this.carService.update(
      plate,
      UpdateCarDTO.parse(request.body)
    );
    return response.json(car);
  }

  @Delete("/:plate")
  async delete(request: Request, response: Response) {
    const { plate } = request.params;
    await this.carService.delete(plate);
    return response.json({ message: "Car deleted" });
  }
}
