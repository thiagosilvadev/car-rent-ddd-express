import { AppRouter } from "./app-router";
import { Car } from "./modules/car/domain/car.entity";
import { CarRepositoryInMemory } from "./modules/car/infra/repositories/car-repository-in-memory";

const appRouter = new AppRouter();

appRouter.router.get("/", (req, res) => {
  res.send("Hello World!");
});

export { appRouter };