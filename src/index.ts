import "reflect-metadata";
import "dotenv/config";
import { Application } from "@/application/app";
const PORT = Application.config.port;
Application.instance.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
  console.info(`http://localhost:${PORT}`);
  console.table(Application.routes);
});
