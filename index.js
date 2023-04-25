const express = require("express");
const { connection } = require("./config/db.js");
const { userRoute } = require("./routes/user.route.js");
const { flightRouter } = require("./routes/flight.route.js");
const { bookingRouter } = require("./routes/booking.route.js");
require("dotenv").config();
const port = process.env.PORT;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Basic API endpoint");
});

app.use("/users", userRoute);
app.use("/flights", flightRouter);
app.use("/booking",bookingRouter)

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to dataBase");
  } catch (error) {
    console.log("Error occurred while connection to dataBase");
    console.log(error);
  }
  console.log(`App is live at http://localhost:${port}`);
});
