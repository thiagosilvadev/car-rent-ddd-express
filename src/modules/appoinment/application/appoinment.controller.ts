import { Post } from "@/utils/handlers.decorator";
import Controller from "@/utils/controller.decorator";
import { Response } from "express";
import { AppoinmentService } from "./appoinment.service";
import { CreateAppoinmentDTO } from "./dto/create-appoinment.dto";
import { AppoinmentRepositoryPrisma } from "../infra/appoinment-repository-prisma";
import { CarRepositoryPrisma } from "@/modules/car/infra/repositories/car-repostiory-prisma";
import { PaymentRepositoryPrisma } from "../infra/payment-repository-prisma";

const appoinmentRepository = new AppoinmentRepositoryPrisma();
const carRepository = new CarRepositoryPrisma();
const paymentRepository = new PaymentRepositoryPrisma();
@Controller("/appoinments")
export class AppoinmentController {
  private readonly appoinmentService: AppoinmentService;
  constructor() {
    this.appoinmentService = new AppoinmentService(
      appoinmentRepository,
      carRepository,
      paymentRepository
    );
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

  @Post("/:id/pay")
  async pay(request: AuthenticatedRequest, response: Response) {
    const { id } = request.params;
    const appoinment = await this.appoinmentService.payAppoinment(id);
    return response.json({
      appoinment,
    });
  }
}
