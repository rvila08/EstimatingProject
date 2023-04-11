const express = require("express");
const multer = require("multer");
const mysql = require("mysql2/promise");

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const cors = require("cors");

// Enable CORS for all origins
app.use(cors());

// ... other middleware and route handlers

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

app.post("/api/upload", upload.array("files"), async (req, res) => {
  try {
    const carInfo = JSON.parse(req.body.carInfo);
    const files = req.files;

    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Eagles88!",
      database: "estimate"
    });

    // Insert car information into "cars" table
    const [
      result
    ] = await connection.execute(
      "INSERT INTO cars (make, model, year, vin, color) VALUES (?, ?, ?, ?, ?)",
      [carInfo.make, carInfo.model, carInfo.year, carInfo.vin, carInfo.color]
    );

    const carId = result.insertId;

    // Insert file information into "files" table
    for (const file of files) {
      const [
        result
      ] = await connection.execute(
        "INSERT INTO files (car_id, filename, mimetype, data) VALUES (?, ?, ?, ?)",
        [carId, file.originalname, file.mimetype, file.buffer]
      );
    }

    connection.end();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
