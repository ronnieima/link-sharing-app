import express from "express";
import cors from "cors";

const PORT = 8080;

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
