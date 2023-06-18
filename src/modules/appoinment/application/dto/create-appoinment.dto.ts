import { BaseDTO } from "@/application/dto";
import { z } from "zod";

const createAppoinmentSchema = z.object({
  userId: z.string().uuid(),
  carId: z.string().uuid(),
  start: z.date(),
  end: z.date(),
});

type CreateAppoinmentDTOValue = z.infer<typeof createAppoinmentSchema>;
type CreateAppoinmentDTOType = typeof createAppoinmentSchema;

export class CreateAppoinmentDTO extends BaseDTO<
  CreateAppoinmentDTOValue,
  CreateAppoinmentDTOType
> {
  public static parse(value: CreateAppoinmentDTOValue) {
    return new CreateAppoinmentDTO(value, createAppoinmentSchema);
  }
  private constructor(
    value: CreateAppoinmentDTOValue,
    schema: CreateAppoinmentDTOType
  ) {
    super(value, schema);
  }
}
