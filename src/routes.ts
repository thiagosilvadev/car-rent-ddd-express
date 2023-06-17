import { AppRouter } from "./app-router";

const appRouter = new AppRouter();

appRouter.router.get("/", (req, res) => {
  res.send("Hello card!");
});

export { appRouter };