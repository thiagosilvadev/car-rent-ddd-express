import { Repository } from "@/application/repository";
import { Appoinment } from "./appoinment.entity";

export interface AppoinmentRepository extends Repository<Appoinment> {}