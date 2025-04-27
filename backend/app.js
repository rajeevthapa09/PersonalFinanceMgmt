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

        console.log("here 11")
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

      console.log("token is auth: ", token);
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

    app.post("/api/budget/:email", async (req, res) => {
      const db = getDb();

      const email = req.params.email;
      const {budget, date} = req.body;

      try {
        console.log("Incoming:", req.body,  email);
        const check = await db.collection(COLLECTION_NAME).findOne({ email: req.params.email, "budget.date": req.body.date });
        
        console.log("2")
        let ret = null;
        if (check) {
          ret = await db.collection(COLLECTION_NAME).updateOne({ email: req.params.email }, { $set: { "budget.$[obj].category": req.body.budget } },
            { arrayFilters: [{ "obj.date": req.body.date }] });
        } else {
          ret = await db.collection(COLLECTION_NAME).updateOne({ email: req.params.email }, { $push: { category: req.body } });
        }
        res.status(200).send({ success: true, data: ret });
      } catch (error) {
        console.error(error);
        res.status(400).send({ success: false, error: "db error" })
      }

    })

    app.get("/getBudget/:date/:email", async (req, res) => {
      const db = getDb();
      try {
        const ret = await db.collection(COLLECTION_NAME).findOne({ email: req.params.email });
        const check = ret.category.filter((bud) => bud.date === req.params.date);
        if (check.length > 0) {
          res.status(200).send({ success: true, data: check[0] })
        } else {
          res.status(200).send({ success: true, data: null })
        }
    
      } catch (error) {
        res.status(400).send({ success: false, error: "db error" })
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