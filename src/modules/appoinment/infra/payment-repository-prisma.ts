import { prisma } from "@/infra/database/prisma.client";
import { Payment } from "../domain/payment.entity";
import { PaymentRepository } from "../domain/payment.repository";
import PaymentMapper from "./mappers/payment.mapper";
import { Prisma } from "@prisma/client";

export class PaymentRepositoryPrisma implements PaymentRepository {
  async save(entity: Payment): Promise<void> {
    const payment = PaymentMapper.toPersistence(entity);
    await prisma.payment.create({
      data: payment,
    });
  }
  async delete(id: string): Promise<void> {
    await prisma.payment.delete({
      where: {
        id,
      },
    });
  }
  async update(entity: Payment): Promise<void> {
    await prisma.payment.update({
      where: {
        id: entity.id,
      },
      data: PaymentMapper.toPersistence(entity),
    });
  }
  async findById(id: string): Promise<Payment | null> {
    const payment = await prisma.payment.findUnique({
      where: {
        id,
      },
    });

    if (!payment) {
      return null;
    }

    return PaymentMapper.toDomain(payment);
  }
  async findAll(): Promise<Payment[]> {
    const payments = await prisma.payment.findMany();

    return payments.map(PaymentMapper.toDomain);
  }
  async where(
    conditions: Partial<Record<keyof Payment, unknown>>
  ): Promise<Payment[]> {
    const payments = await prisma.payment.findMany({
      where: this.parseWhere(conditions),
    });

    return payments.map(PaymentMapper.toDomain);
  }

  private parseWhere(
    conditions: Partial<Record<keyof Payment, unknown>>
  ): Prisma.PaymentWhereInput {
    const { id, userId, appoinmentId, status, method } = conditions;

    return {
      id: id as string | undefined,
      userId: userId as string | undefined,
      appoinmentId: appoinmentId as string | undefined,
      status: status as string | undefined,
      method: method as string | undefined,
    };
  }
}
