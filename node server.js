const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
const connectiondata = require("./config/db");
connectiondata();
const userRouter = require("./routes/userRouter");
app.use("/api/v1/user", userRouter);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server is listening at port ${port}`.bgCyan.white)
})