const { mongoConnect } = require('./util/database');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const PRIVATE_KEY = "finance";
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require('dotenv').config();
const { connectToMongo, getDb } = require('./util/database');

const app = express();
app.use(express.json());
app.use(cors());
const COLLECTION_NAME = "users";

//ensure uploads dir exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)){
  fs.mkdirSync(uploadDir);
}

//configure multer
const storage = multer.diskStorage({
  destination: (res, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({storage});

// Serve static files from the "public" directory
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));


async function startServer() {
  try {
    await connectToMongo(); // wait for Mongo to connect first
    console.log("MongoDB connected. Starting server...");


    app.post("/signup", upload.single("profileImg"), async (req, res) => {
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

        const result = await db.collection(COLLECTION_NAME).insertOne({ ...body, password: encrypted, budget: [], profileImgPath: req.file ? "/uploads/" + req.file.filename : null});

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
            userName: currentUser.fname,
            profileImg: currentUser.profileImgPath || null
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
        let user = null;
        if (budgetFound) {
          user = await db.collection(COLLECTION_NAME).updateOne({ email: req.params.email }, { $set: { "budget.$[obj].items": req.body.items, "budget.$[obj].sum": req.body.sum } },
            { arrayFilters: [{ "obj.date": req.body.date }] });
        } else {
          user = await db.collection(COLLECTION_NAME).updateOne({ email: req.params.email }, { $push: { budget: req.body } });
        }
        res.status(200).send({ success: true, data: user });
      } catch (error) {
        console.error(error);
        res.status(400).send({ success: false, error: error.message })
      }

    })

    app.get("/api/budgets", async (req, res) => {
      const db = getDb();
      try {
        const user = await db.collection(COLLECTION_NAME).findOne({ email: req.query.email });
        if (!user) {
          return res.status(404).send({ success: false, error: "User not found" });
        }
        const budgetFound = user.budget.find((budgetItem) => budgetItem.date === req.query.date);
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
      console.log("test1")
      const db = getDb();
      try {
        console.log("test", req.body)
        const expenseFound = await db.collection(COLLECTION_NAME).findOne({ email: req.params.email, "expense.date": req.body.date });
        console.log("expense found", expenseFound)
        let user = null;
        if (expenseFound) {
          user = await db.collection(COLLECTION_NAME).updateOne({ email: req.params.email }, { $set: { "expense.$[obj].expenseItems": req.body.expenseItems, "expense.$[obj].sum": req.body.sum } },
            { arrayFilters: [{ "obj.date": req.body.date }] });
        } else {
          user = await db.collection(COLLECTION_NAME).updateOne({ email: req.params.email }, { $push: { expense: {date: req.body.date, expenseItems: req.body.expenseItems, sum: req.body.sum} } });
        }
        res.status(200).send({ success: true, data: user });
        if (!user) {
          return res.status(404).send({ success: false, error: "User not found" });
        }
        // const expenseFound = dbResult.expense.find((expenseItem) => expenseItem.date ===  )

      } catch(error) {
        res.status(400).send({ sucess: false, error: error.message })
      }
    })

    app.get("/api/expenses", async (req, res) => {
      const db = getDb();
      try {
        const user = await db.collection(COLLECTION_NAME).findOne({ email: req.query.email });
        if (!user) {
          return res.status(404).send({ success: false, error: "User not found" });
        }
        const expenseFound = user.expense.find((expenseItem) => expenseItem.date === req.query.date);
        if (expenseFound) {
          res.status(200).send({ success: true, data: expenseFound })
        } else {
          res.status(200).send({ success: true, data: null })
        }

      } catch (error) {
        res.status(400).send({ success: false, error: error.message })
      }
    })

    app.post("/api/income/:email", async (req, res) => {
      console.log("test2")
      const db = getDb();
      try {
        console.log("test income", req.body)
        const incomeFound = await db.collection(COLLECTION_NAME).findOne({ email: req.params.email, "income.date": req.body.date });
        console.log("income found", req.body.date)
        let user = null;
        if (incomeFound) {
          user = await db.collection(COLLECTION_NAME).updateOne({ email: req.params.email }, { $set: { "income.$[obj].incomeItems": req.body.incomeItems, "income.$[obj].sum": req.body.sum  } },
            { arrayFilters: [{ "obj.date": req.body.date }] });
        } else {
          user = await db.collection(COLLECTION_NAME).updateOne({ email: req.params.email }, { $push: { income: {date: req.body.date, incomeItems: req.body.incomeItems, sum: req.body.sum} } });
        }
        
        if (!user) {
          return res.status(404).send({ success: false, error: "User not found" });
        }
        res.status(200).send({ success: true, data: user });
        // const expenseFound = dbResult.expense.find((expenseItem) => expenseItem.date ===  )

      } catch(error) {
        res.status(400).send({ sucess: false, error: error.message })
      }
    })

     app.get("/api/income", async (req, res) => {
      const db = getDb();
      try {
        const user = await db.collection(COLLECTION_NAME).findOne({ email: req.query.email });
        if (!user) {
          return res.status(404).send({ success: false, error: "User not found" });
        }
        const incomeFound = user.income.find((incomeItem) => incomeItem.date === req.query.date);
        if (incomeFound) {
          res.status(200).send({ success: true, data: incomeFound })
        } else {
          res.status(200).send({ success: true, data: null })
        }

      } catch (error) {
        res.status(400).send({ success: false, error: error.message })
      }
    })

      app.get("/api/summary", async (req, res) => {
      const db = getDb();
      try {
        const user = await db.collection(COLLECTION_NAME).findOne({ email: req.query.email });
        if (!user) {
          return res.status(404).send({ success: false, error: "User not found" });
        }
        const incomeFound = user.income.find((incomeItem) => incomeItem.date === req.query.date);
        const expenseFound = user.expense.find((expenseItem) => expenseItem.date === req.query.date);
        const budgetFound = user.budget.find((budgetItem) => budgetItem.date === req.query.date);

        if(incomeFound || expenseFound || budgetFound){
          res.status(200).send({ success: true, data: {income: incomeFound.sum, expense: expenseFound.sum, budget: budgetFound.sum} })
        } else {
          res.status(200).send({ success: true, data: null })
        }

      } catch (error) {
        res.status(400).send({ success: false, error: error.message })
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