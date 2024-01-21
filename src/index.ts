import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();
const port: number = 4000;

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ data: "Hello World", body: "my body" });
});
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => console.log(`listen on port ${port}`));