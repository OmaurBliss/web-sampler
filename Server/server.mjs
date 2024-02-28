import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./Routes/record.mjs";

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use("/record", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
