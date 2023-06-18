import { Request, Response } from "express";

import { CarRepositoryInMemory } from "../infra/repositories/car-repository-in-memory";
import { carSeeder } from "../infra/seeder";
import { Delete, Get, Post, Put } from "@/utils/handlers.decorator";
import Controller from "@/utils/controller.decorator";
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
    this.carService = new CarService(repo);
  }

  /**
   * @description Get all cars available or filter by query params
   * @param request
   * @param response
   * @returns
   */
  @Get("")
  async index(request: AuthenticatedRequest, response: Response) {
    const query = request.query;
    const cars = await this.carService.findBy({
      ...query,
      isAvailable: true,
    });
    return response.json(cars);
  }

  @Post("")
  async create(request: AuthenticatedRequest, response: Response) {
    try {
      const car = await this.carService.create(
        CreateCarDto.parse(request.body as any)
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
  async findByPlate(request: AuthenticatedRequest, response: Response) {
    const { plate } = request.params;
    const car = await this.carService.findByPlate(plate);
    if (!car) {
      return response.status(404).json({ error: "Car not found" });
    }
    return response.json(car);
  }

  @Put("/:plate")
  async update(request: AuthenticatedRequest, response: Response) {
    const { plate } = request.params;
    const car = await this.carService.update(
      plate,
      UpdateCarDTO.parse(request.body as any)
    );
    return response.json(car);
  }

  @Delete("/:plate")
  async delete(request: AuthenticatedRequest, response: Response) {
    const { plate } = request.params;
    await this.carService.delete(plate);
    return response.json({ message: "Car deleted" });
  }
}
