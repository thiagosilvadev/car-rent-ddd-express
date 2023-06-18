import { CarRepository } from "@/modules/car/domain/car.repository";
import { AppoinmentRepository } from "../domain/appoinment.repository";
import { Appoinment } from "../domain/appoinment.entity";
import { numberOfdaysInDateRange } from "@/utils/time";
import { CreateAppoinmentDTO } from "./dto/create-appoinment.dto";
import { Payment } from "../domain/payment.entity";
import { PaymentRepository } from "../domain/payment.repository";

export class AppoinmentService {
  constructor(
    private readonly appoinmentRepository: AppoinmentRepository,
    private readonly carRepository: CarRepository,
    private readonly paymentRepository: PaymentRepository
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

    const payment = Payment.create({
      appoinmentId: appoinment.id,
      method: "credit_card",
      status: "pending",
      userId,
    });

    await this.paymentRepository.save(payment);

    return appoinment;
  }

  async payAppoinment(id: string): Promise<Appoinment> {
    const appoinment = await this.appoinmentRepository.findById(id);
    if (!appoinment) {
      throw new Error("Appoinment not found");
    }

    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new Error("Payment not found");
    }

    await payment.pay();
    await this.paymentRepository.update(payment);

    return appoinment;
  }
}
