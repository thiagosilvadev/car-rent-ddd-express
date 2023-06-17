import { shallowEqual } from "shallow-equal-object";
import { ValidationSchema } from "../shared/validation-schema";

interface ValueObjectProps {
  [index: string]: any;
}

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */

export abstract class ValueObject<
  TProps extends ValueObjectProps,
  TSchema extends ValidationSchema<TProps> = never
> {
  public readonly props: TProps;
  constructor(props: TProps, schema?: TSchema) {
    if(schema) {
      const validatedProps = schema.parse(props);
      this.props = Object.freeze(validatedProps);
      return;
    }
    this.props = Object.freeze(props);

  }

  public equals(vo?: ValueObject<TProps, TSchema>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.props === undefined) {
      return false;
    }
    return shallowEqual(this.props, vo.props);
  }
}
