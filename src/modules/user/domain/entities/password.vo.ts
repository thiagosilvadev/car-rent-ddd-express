import { z } from "zod";
import bcrypt from "bcrypt";
import { ValueObject } from "../../../../domain/value-object";

const passwordSchema = z.object({
  value: z.string().min(8).max(30),
});

type PasswordSchema = typeof passwordSchema;
type PasswordProps = z.infer<PasswordSchema>;

export class Password extends ValueObject<PasswordProps, PasswordSchema> {
  private constructor(props: PasswordProps) {
    super(props);
  }

  public static async create(props: PasswordProps): Promise<Password> {
    const validatedProps = passwordSchema.parse(props);
    const hash = await bcrypt.hash(validatedProps.value, 10);
    return new Password({
      value: hash,
    });
  }

  public static restore(props: PasswordProps): Password {
    return new Password(props);
  }

  public async compare(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.props.value);
  }

  public toJSON() {
    return this.props.value;
  }
}
