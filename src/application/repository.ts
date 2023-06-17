import { Entity } from "@/domain/entity";

export interface Repository<T extends Entity<unknown>> {
  save(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
  update(entity: T): Promise<void>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  where(conditions: Partial<Record<keyof T, unknown>>): Promise<T[]>;
}