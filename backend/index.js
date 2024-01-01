require("dotenv").config();
const express = require("express");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const PORT = process.env.PORT;
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
connectDB();
app.use(express.json());

app.use(cors());
app.get("/", (req, res) => {
  res.send("Api called and is running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log("Server running at 5000"));
