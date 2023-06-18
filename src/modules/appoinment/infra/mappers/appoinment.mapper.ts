import { Mapper } from "@/domain/mapper";
import { Appoinment as AppoinmentPrisma } from "@prisma/client";
import { Appoinment } from "../../domain/appoinment.entity";
export class AppoinmentMapper implements Mapper<Appoinment, AppoinmentPrisma> {
  toDomain({ id, ...raw }: AppoinmentPrisma): Appoinment {
    const appoinment = Appoinment.restore(
      {
        ...raw,
      },
      id
    );

    return appoinment;
  }
  toPersistence(entity: Appoinment): AppoinmentPrisma {
    return {
      id: entity.id,
      carId: entity.carId,
      userId: entity.userId,
      start: entity.start,
      end: entity.end,
      totalPrice: entity.totalPrice,
    };
  }
  toDTO(entity: Appoinment) {
    throw new Error("Method not implemented.");
  }
}

export default new AppoinmentMapper();
