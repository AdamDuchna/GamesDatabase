const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const dotenv = require("dotenv")
dotenv.config()


const frontend = require("./routes/frontend");
const integration = require("./routes/integration")
const webapp = require("./routes/webapp")

app.use("/frontend", frontend);
app.use("/integration", integration);
app.use("/webapp",webapp);



const dbConnData = {
  host: process.env.MONGO_HOST || "mongodb",
  port: process.env.MONGO_PORT || 27017,
  database: process.env.MONGO_DATABASE || "local",
}; 

const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`,
    { useNewUrlParser: true, useUnifiedTopology: true, directConnection: true }
  )
  .then((response) => {
    console.log(
      `Connected to MongoDB. Database name: "${response.connections[0].name}"`
    );
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
  })
  .catch((error) => console.error("Error connecting to MongoDB", error));
