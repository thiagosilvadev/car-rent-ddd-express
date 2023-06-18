import { Post } from "@/utils/handlers.decorator";
import Controller from "@/utils/controller.decorator";
import { Response } from "express";
import { Appoinment } from "../domain/appoinment";
import { AppoinmentService } from "./appoinment.service";
import { CreateAppoinmentDTO } from "./dto/create-appoinment.dto";
import { AppoinmentRepositoryInMemory } from "../infra/appoinment-repository-in-memory";
import { UserRepositoryInMemory } from "@/modules/user/infra/user-repository-in-memory";
import { CarRepositoryInMemory } from "@/modules/car/infra/repositories/car-repository-in-memory";

const appoinmentRepository = new AppoinmentRepositoryInMemory();
const carRepository = new CarRepositoryInMemory();
@Controller("/appoinments")
export class AppoinmentController {
  private readonly appoinmentService: AppoinmentService
  constructor(
    ) {
    this.appoinmentService = new AppoinmentService(appoinmentRepository, carRepository);
    }
  @Post()
  async create(request: AuthenticatedRequest, response: Response) {
    const appoinment = await this.appoinmentService.createAppoinment(
      CreateAppoinmentDTO.parse(request.body as any)
    );
    return response.json({
      appoinment,
    });
  }
}
