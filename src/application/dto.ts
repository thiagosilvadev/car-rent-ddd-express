import { ValidationSchema } from "../shared/validation-schema";

export abstract class BaseDTO<TValue, TSchema extends ValidationSchema<TValue>> {
  value: TValue;
  protected constructor(value: TValue, schema: TSchema) {
    this.value = schema.parse(value);
  }
  public toJSON(): TValue {
    return this.value;
  }
}
