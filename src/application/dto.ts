import { ZodError } from "zod";

interface Schema {
  parse(value: any): any;
}

export abstract class BaseDTO<TValue, TSchema extends Schema> {
  value: TValue;
  protected constructor(value: TValue, schema: TSchema) {
    this.value = schema.parse(value);
  }
  public toJSON(): TValue {
    return this.value;
  }
}
