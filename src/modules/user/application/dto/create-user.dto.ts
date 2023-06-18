import { BaseDTO } from "@/application/dto";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

type CreateUserDTOSchema = typeof createUserSchema;
type CreateUserDTOValue = z.infer<CreateUserDTOSchema>;

export class CreateUserDTO extends BaseDTO<
  CreateUserDTOValue,
  CreateUserDTOSchema
> {
  public static parse(dto: CreateUserDTOValue): CreateUserDTO {
    return new CreateUserDTO(dto, createUserSchema);
  }
}
