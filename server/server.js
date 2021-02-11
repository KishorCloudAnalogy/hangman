const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("../database_config/connection");
const pgp = require("pg-promise")();
const db = pgp(dbConfig);
let app = express();
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());

app.post("/saveHistory", async (req, res) => {
  try {
    const { date, error, finish } = req.body;
    if (date) {
      const sql =
        "INSERT INTO public.hangman(date,error,finish) VALUES($1,$2,$3) RETURNING id";
      db.query(sql, [date, error, finish])
        .then((resp) => {
          res.statusCode = 200;
          res.json({
            message: "Successfully save.",
            data: resp,
            ok: true,
          });
        })
        .catch((e) => {
          console.log("Error===> ", e);
          res.statusCode = 500;
          res.json({
            message: "Getting Error on save.",
            data: err,
            ok: false,
          });
        });
    } else {
      res.statusCode = 500;
      res.json({
        message: "Error",
        data: "Required field Data is missing.",
        ok: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went gone wrong.",
      data: err,
      ok: false,
    });
  }
});

app.get("/savedHistory", async (req, res) => {
  try {
    const sql = "SELECT * FROM public.hangman";
    db.query(sql)
      .then((resp) => {
        if (resp && resp.length > 0) {
          res.status(200).send({
            message: "Records searched successfully.",
            data: resp,
            ok: true,
          });
        } else {
          res.status(200).send({
            message: "No records.",
            data: [],
            ok: true,
          });
        }
      })
      .catch((e) => {
        res.status(500).send({
          message: "Something went gone wrong.",
          data: e,
          ok: false,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Something went gone wrong.",
      data: err,
      ok: false,
    });
  }
});

app.listen(process.env.PORT || 3008, function () {
  console.log("Server is running on Port " + (process.env.PORT || 3008));
});
