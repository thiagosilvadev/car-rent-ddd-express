import { CarRepository } from "@/modules/car/domain/car.repository";
import { AppoinmentRepository } from "../domain/appoinment.repository";
import { Appoinment } from "../domain/appoinment";
import { numberOfdaysInDateRange } from "@/utils/time";
import { CreateAppoinmentDTO } from "./dto/create-appoinment.dto";

export class AppoinmentService {
  constructor(
    private readonly appoinmentRepository: AppoinmentRepository,
    private readonly carRepository: CarRepository
  ) {}

  async createAppoinment(request: CreateAppoinmentDTO): Promise<Appoinment> {
    const { carId, userId, start, end } = request.value;

    const car = await this.carRepository.findById(carId);
    if (!car) {
      throw new Error("Car not found");
    }

    if (!car.isAvailable) {
      throw new Error("Car is not available");
    }

    const totalPrice = car.price * numberOfdaysInDateRange(start, end);

    const appoinment = Appoinment.create({
      carId,
      userId,
      start,
      end,
      totalPrice,
    });

    await this.appoinmentRepository.save(appoinment);
    car.update({ isAvailable: false });
    await this.carRepository.update(car);

    return appoinment;
  }
}
