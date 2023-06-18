import { CarRepositoryPrisma } from "./modules/car/infra/repositories/car-repostiory-prisma";
import { carSeeder } from "./modules/car/infra/seeder";

const carRepo = new CarRepositoryPrisma();

async function main() {
  await carSeeder(carRepo, 20);
}

main().finally(() => {
  console.log("Seeded");
  process.exit(0);
});
