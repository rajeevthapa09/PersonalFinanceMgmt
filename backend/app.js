const { mongoConnect } = require('./util/database');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const PRIVATE_KEY = "finance";
require('dotenv').config();
const { connectToMongo, getDb } = require('./util/database');

const app = express();
app.use(express.json());
app.use(cors());
const COLLECTION_NAME = "users";


async function startServer() {
  try {
    await connectToMongo(); // wait for Mongo to connect first
    console.log("MongoDB connected. Starting server...");


    app.post("/signup", async (req, res) => {
      const db = getDb();

      try {
        const body = req.body;

        const existingUser = await db.collection(COLLECTION_NAME).find({ email: body.email }).toArray();

        if (existingUser.length > 0) {
          return res
            .status(409)
            .send({ success: false, error: "please use another email" });
        }

        const encrypted = await bcrypt.hash(body.password, 10);

        const result = await db.collection(COLLECTION_NAME).insertOne({ ...body, password: encrypted, budget: [], stocks: [], chat: [], reviews: [], monthlyAdvisingFee: 0 });

        res.status(200).send({ success: true, data: result });
      } catch (error) {
        res.status(500).send({ success: false, err: "DB error" })
      }
    })

    app.post("/login", async (req, res) => {
      const db = getDb();
      try {
        const body = req.body;
        const currentUser = await db.collection(COLLECTION_NAME).findOne({ email: body.email });

        if (!currentUser) {
          return res.status(401).send({ success: false, error: "Invalid email or password" });
        }


        const correctPwd = await bcrypt.compare(body.password, currentUser.password);
        if (!correctPwd) {
          return res.status(401).send({ success: false, error: "Invalid email or password" });
        }

        const token = jwt.sign({ email: currentUser.email }, PRIVATE_KEY);
        return res.send({
          success: true,
          data: {
            token,
            email: currentUser.email,
            role: currentUser.role,
            userId: currentUser._id,
            userName: currentUser.name
          }
        });
      } catch (err) {
        console.error("Login error:", err);
        return res.status(500).send({ success: false, error: "Internal server error" });
      }

    })

    function auth(req, res, next) {
      const token = req.headers["authorization"]?.split(" ")[1];
      console.log("authorization header: ", req.headers["authorization"]);
      const key = PRIVATE_KEY;

      if (!token) {
        return res.status(401).send({ success: false, error: "Please provide token" });
      }

      jwt.verify(token, key, (err, decoded) => {
        if (err) {
          return res.status(401).send({ success: false, error: err.message });
        }
        // req.currentUser = decoded;
        next();
      })
    }
    app.use(auth);

    app.post("/api/budgets/:email", async (req, res) => {
      const db = getDb();
      const email = req.params.email;

      try {
        const budgetFound = await db.collection(COLLECTION_NAME).findOne({ email: req.params.email, "budget.date": req.body.date });
        let dbResult = null;
        if (budgetFound) {
          dbResult = await db.collection(COLLECTION_NAME).updateOne({ email: req.params.email }, { $set: { "budget.$[obj].items": req.body.items } },
            { arrayFilters: [{ "obj.date": req.body.date }] });
        } else {
          dbResult = await db.collection(COLLECTION_NAME).updateOne({ email: req.params.email }, { $push: { budget: req.body } });
        }
        res.status(200).send({ success: true, data: dbResult });
      } catch (error) {
        console.error(error);
        res.status(400).send({ success: false, error: error.message })
      }

    })

    app.get("/api/budgets", async (req, res) => {
      const db = getDb();
      try {
        const dbResult = await db.collection(COLLECTION_NAME).findOne({ email: req.query.email });
        if (!dbResult) {
          return res.status(404).send({ success: false, error: "User not found" });
        }
        const budgetFound = dbResult.budget.find((budgetItem) => budgetItem.date === req.query.date);
        if (budgetFound) {
          res.status(200).send({ success: true, data: budgetFound })
        } else {
          res.status(200).send({ success: true, data: null })
        }

      } catch (error) {
        res.status(400).send({ success: false, error: error.message })
      }
    })

    app.post("/api/expense/:email", async (req, res) => {
      const db = getDb();
      try {
        const dbResult = await db.collection(COLLECTION_NAME).findOne({ email: req.params.email });
        console.log("dbResult: ", dbResult)
        if (!dbResult) {
          return res.status(404).send({ success: false, error: "User not found" });
        }
        // const expenseFound = dbResult.expense.find((expenseItem) => expenseItem.date ===  )

      } catch {
        res.status(400).send({ sucess: false, error: error.message })
      }
    })

    app.listen(3001, () => {
      console.log('Your Server is running on 3001');
    });

  } catch (err) {
    console.error("Startup error:", err);
  }
}

startServer();