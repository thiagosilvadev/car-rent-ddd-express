export interface ValidationSchema<TValue> {
  parse(value: any): TValue;
}