const { mongoConnect } = require('./util/database');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectToMongo, getDb } = require('./util/database');

const app = express();
app.use(express.json());
app.use(cors());

connectToMongo().then(() => {
  const db = getDb();
  const COLLECTION_NAME = db.collection("users");

  app.post("/signup", async (req, res) => {
    try {
      const body = req.body;
      body.profileImg = req.file.filename;
      const newUser = await db.collection(COLLECTION_NAME).find({ email: body.email }).toArray();

      if (newUser.length > 0) {
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

})

app.listen(3001, () => {
  console.log('Your Server is running on 3001');
});

