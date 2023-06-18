import { Repository } from "@/application/repository";
import { Payment } from "./payment.entity";

export interface PaymentRepository extends Repository<Payment> {}