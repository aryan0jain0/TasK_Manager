import "./config/db.js";
import { app } from "./app.js";

const port = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Haan bhai chal rha hai");
});
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
