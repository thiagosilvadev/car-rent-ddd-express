import { Entity } from "../../../domain/entity";



export interface CarProps {
  plate: string;
  model: string;
  brand: string;
  year: number;
  color: string;
  price: number;
  isAvailable: boolean;
}

export class Car extends Entity<CarProps> {
  private constructor(props: CarProps, id?: string) {
    super(props, id);
  }

  public static create(props: CarProps, id?: string): Car {
    const car = new Car(props, id);
    return car;
  }

  public static fromPrimitives(props: CarProps, id: string): Car {
    return Car.create(props, id);
  }

  public toPrimitives(): CarProps {
    return this.props;
  }

  public update(props: Partial<CarProps>): Car {
    return Car.create({ ...this.props, ...props }, this._id);
  }

  public get id(): string {
    return this._id;
  }

  public get plate(): string {
    return this.props.plate;
  }

  public get model(): string {
    return this.props.model;
  }

  public get brand(): string {
    return this.props.brand;
  }

  public get year(): number {
    return this.props.year;
  }

  public get color(): string {
    return this.props.color;
  }

  public get price(): number {
    return this.props.price;
  }

  public get isAvailable(): boolean {
    return this.props.isAvailable;
  }
}


