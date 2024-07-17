import express from "express";
import mongoose from "mongoose";
import multer from 'multer';
import cors from 'cors';
import * as UserController from "./controllers/UserController.js";
import checkAuth from "./utils/checkAuth.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import { registerValidation, loginValidation } from "./validations.js";

const db = "mongodb+srv://user:12345@cluster0.xo0ojo1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log("DB error:", err);
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage })

app.use('/uploads', express.static('uploads'))
app.use(express.json());
app.use(cors());

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({ url: `/uploads/${req.file.originalname}` });
});

app.post("/auth/login", loginValidation, handleValidationErrors, UserController.login);
app.post("/auth/register", registerValidation, handleValidationErrors, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
