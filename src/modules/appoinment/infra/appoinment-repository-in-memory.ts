import { Appoinment } from "../domain/appoinment";
import { AppoinmentRepository } from "../domain/appoinment.repository";
import * as fs from "fs";

export class AppoinmentRepositoryInMemory implements AppoinmentRepository {
  private filePath: string;
  private appointments: Appoinment[];

  constructor(filePath: string = './appointments.json') {
    this.filePath = filePath;
    this.appointments = this.loadAppointments();
  }

  private loadAppointments(): Appoinment[] {
    try {
      const data = fs.readFileSync(this.filePath, "utf-8");
      // @ts-ignore
      return JSON.parse(data).map(({ ...a, id }) =>
        // @ts-ignore
        Appoinment.restore(a, id)
      ) as Appoinment[];
    } catch (error) {
      console.log("Error loading appointments:", error);
      return [];
    }
  }

  private saveAppointments(): void {
    const data = JSON.stringify(this.appointments);
    fs.writeFileSync(this.filePath, data, "utf-8");
  }

  save(entity: Appoinment): Promise<void> {
    this.appointments.push(entity);
    this.saveAppointments();
    return Promise.resolve();
  }

  delete(id: string): Promise<void> {
    const index = this.appointments.findIndex(
      (appointment) => appointment.id === id
    );
    if (index !== -1) {
      this.appointments.splice(index, 1);
      this.saveAppointments();
    }
    return Promise.resolve();
  }

  update(entity: Appoinment): Promise<void> {
    const index = this.appointments.findIndex(
      (appointment) => appointment.id === entity.id
    );
    if (index !== -1) {
      this.appointments[index] = entity;
      this.saveAppointments();
    }
    return Promise.resolve();
  }

  findById(id: string): Promise<Appoinment | null> {
    const appointment = this.appointments.find(
      (appointment) => appointment.id === id
    );
    return Promise.resolve(appointment || null);
  }

  findAll(): Promise<Appoinment[]> {
    return Promise.resolve(this.appointments);
  }

  where(
    conditions: Partial<Record<keyof Appoinment, unknown>>
  ): Promise<Appoinment[]> {
    const filteredAppointments = this.appointments.filter((appointment) => {
      for (const key in conditions) {
        if (
          appointment[key as keyof typeof conditions] !==
          conditions[key as keyof typeof conditions]
        ) {
          return false;
        }
      }
      return true;
    });
    return Promise.resolve(filteredAppointments);
  }
}
