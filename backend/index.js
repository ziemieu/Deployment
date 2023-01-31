import express from "express";
import mysql from "mysql";
import cors from "cors";


//Add Middleware to send Json Files
const app = express();
app.use(express.json());
app.use(cors());

//Connect with mysql db
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@1Passworld.com",
    database: "test",
  });

// Connect with our API's
  app.get("/", (req, res) => {
    res.json("hello user");
  });

  app.get("/cloths", (req, res) => {
    const q = "SELECT * FROM cloths";
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });
  


//Add Cloths to our db
  app.post("/cloths", (req, res) => {
    const q = "INSERT INTO cloths(`title`, `desc`, `price`, `cover`) VALUES (?)";
  
    const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
    ];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

  app.delete("/cloths/:id", (req, res) => {
    const clothId = req.params.id;
    const q = " DELETE FROM cloths WHERE id = ? ";
  
    db.query(q, [clothId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

  app.put("/cloths/:id", (req, res) => {
    const clothId = req.params.id;
    const q = "UPDATE cloths SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover,
    ];
  
    db.query(q, [...values,clothId], (err, data) => {
      if (err) return res.send(err);
      return res.json("updated");
    });
  });
  
  

app.listen(8800, () => {
    console.log("Connected to backend with nodemon installed");
  });