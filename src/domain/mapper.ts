import { Entity } from "./entity";

export interface Mapper<
  TDomain extends Entity<unknown>,
  TPersistence = any,
  TDto = any
> {
  toDomain(raw: any): TDomain;

  toPersistence(entity: TDomain): TPersistence;

  toDTO(entity: TDomain): TDto;
}
