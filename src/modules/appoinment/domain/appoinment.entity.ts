import { Entity } from "../../../domain/entity";

type AppoinmentProps = {
  userId: string;
  carId: string;
  start: Date;
  end: Date;
  totalPrice: number;
  paymentId?: string;
};

export class Appoinment extends Entity<AppoinmentProps> {
  private constructor(props: AppoinmentProps, id?: string) {
    super(props, id);
  }

  /**
   * @description Creates a new appoinment
   * @param props
   * @param id
   * @returns
   */
  public static create(props: AppoinmentProps, id?: string): Appoinment {
    const appoinment = new Appoinment(props, id);
    return appoinment;
  }
  /**
   * @description Deserializes an appoinment from a plain object
   * @param props
   * @param id
   * @returns
   */
  public static restore(props: AppoinmentProps, id: string): Appoinment {
    return new Appoinment(props, id);
  }

  public get id(): string {
    return this._id;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get carId(): string {
    return this.props.carId;
  }

  public get start(): Date {
    return this.props.start;
  }

  public get end(): Date {
    return this.props.end;
  }

  public get totalPrice(): number {
    return this.props.totalPrice;
  }

  public get paymentId(): string | undefined {
    return this.props.paymentId;
  }

  public get durationInDays(): number {
    const diffTime = Math.abs(this.end.getTime() - this.start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  public toJSON() {
    return {
      id: this._id,
      userId: this.userId,
      carId: this.carId,
      start: this.start,
      end: this.end,
      totalPrice: this.totalPrice,
      paymentId: this.paymentId,
    };
  }
}
