const express = require("express");
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

dbConnect();

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
