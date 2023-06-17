import { z } from "zod";
import { ValueObject } from "../../../../domain/value-object";

const fullNameSchema = z.object({
  name: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
});

type FullNameProps = z.infer<typeof fullNameSchema>;

export class FullName extends ValueObject<
  FullNameProps,
  typeof fullNameSchema
> {
  private constructor(props: FullNameProps, schema: typeof fullNameSchema) {
    super(props, schema);
  }

  public static create(props: FullNameProps): FullName {
    return new FullName(props, fullNameSchema);
  }

  public get value(): string {
    return `${this.props.name} ${this.props.lastName}`;
  }

  public toJSON() {
    return this.value;
  }
}
