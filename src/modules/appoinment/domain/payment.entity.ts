import { Entity } from "@/domain/entity";

export type PaymentStatus = "pending" | "paid" | "canceled";
export type PaymentMethod = "credit_card" | "cash" | "debit_card";
type PaymentProps = {
  userId: string;
  appoinmentId: string;
  status: PaymentStatus;
  method: PaymentMethod;
};

export class Payment extends Entity<PaymentProps> {
  private constructor(props: PaymentProps, id?: string) {
    super(props, id);
  }

  public static create(props: PaymentProps, id?: string): Payment {
    const payment = new Payment(props, id);
    return payment;
  }

  public static restore(props: PaymentProps, id: string): Payment {
    return new Payment(props, id);
  }

  async pay(): Promise<void> {
    this.props.status = "paid";
  }

  async cancel(): Promise<void> {
    this.props.status = "canceled";
  }

  public get id(): string {
    return this._id;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get appoinmentId(): string {
    return this.props.appoinmentId;
  }

  public get status(): PaymentStatus {
    return this.props.status;
  }

  public get method(): PaymentMethod {
    return this.props.method;
  }
}
