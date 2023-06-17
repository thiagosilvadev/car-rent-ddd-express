import { BaseDTO } from "../../../../application/dto";
import { Car } from "../../domain/car.entity";

import { z } from "zod";

const updateCarDtoSchema = z.object({
    plate: z.string().min(9).max(9).optional(),
    model: z.string().min(2).max(255).optional(),
    brand: z.string().min(2).max(255).optional(),
    year: z.number().min(1900).max(new Date().getFullYear()).optional(),
    color: z.string().min(2).max(255).optional(),
    price: z.number().min(0).optional(),
});


export class UpdateCarDTO extends BaseDTO<Partial<Car['props']>, typeof updateCarDtoSchema> {
  private constructor(value: Partial<Car['props']>, schema: typeof updateCarDtoSchema) {
    super(value, schema);
  }

  public static parse(value: Partial<Car['props']>) {
    return new UpdateCarDTO(value, updateCarDtoSchema);
  }
}