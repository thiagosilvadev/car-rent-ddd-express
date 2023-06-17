import { z } from "zod";
import { ValueObject } from "../../../../domain/value-object";

type EmailProps = {
  value: string;
};

const emailSchema = z.object({
  value: z.string().email(),
});

export class Email extends ValueObject<EmailProps, typeof emailSchema> {
  private constructor(props: EmailProps, schema: typeof emailSchema) {
    super(props, schema);
  }

  public static create(props: EmailProps): Email {
    return new Email(props, emailSchema);
  }

  public get value(): string {
    return this.props.value;
  }

  public toJSON() {
    return this.props.value;
  }
}
