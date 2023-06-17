import { BaseDTO } from "../../../../application/dto";
import { z } from "zod";

export interface CreateCarDtoValue {
  plate: string;
  model: string;
  brand: string;
  year: number;
  color: string;
  price: number;
}

const createCarDtoSchema = z.object({
  plate: z.string().min(9).max(9),
  model: z.string().min(2).max(255),
  brand: z.string().min(2).max(255),
  year: z.number().min(1900).max(new Date().getFullYear()),
  color: z.string().min(2).max(255),
  price: z.number().min(0),
});

export class CreateCarDto extends BaseDTO<
  CreateCarDtoValue,
  typeof createCarDtoSchema
> {
  public static parse(value: CreateCarDtoValue) {
    return new CreateCarDto(value, createCarDtoSchema);
  }
  private constructor(
    value: CreateCarDtoValue,
    schema: typeof createCarDtoSchema
  ) {
    super(value, schema);
  }
}
