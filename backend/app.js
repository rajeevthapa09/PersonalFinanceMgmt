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

    app.listen(3001, () => {
      console.log('Your Server is running on 3001');
    });

  } catch (err) {
    console.error("Startup error:", err);
  }
}

startServer();