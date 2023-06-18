import { Mapper } from "@/domain/mapper";
import {
  Payment,
  PaymentMethod,
  PaymentStatus,
} from "../../domain/payment.entity";
import { Payment as PaymentPrisma } from "@prisma/client";
export class PaymentMapper implements Mapper<Payment, PaymentPrisma> {
  toDomain({ id, ...raw }: PaymentPrisma): Payment {
    return Payment.restore(
      {
        ...raw,
        status: raw.status as PaymentStatus,
        method: raw.method as PaymentMethod,
      },
      id
    );
  }
  toPersistence(entity: Payment): PaymentPrisma {
    return {
      appoinmentId: entity.appoinmentId,
      method: entity.method,
      status: entity.status,
      userId: entity.userId,
      id: entity.id,
    };
  }
  toDTO(entity: Payment) {
    throw new Error("Method not implemented.");
  }
}

export default new PaymentMapper();
