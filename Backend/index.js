import express from 'express';
import dotenv from 'dotenv';
import AuthRoutes from './routes/Auth.js';
import DbCon from './utils/db.js';
import NotesRoutes from './routes/Notes.js';
import cookieParser from 'cookie-parser';
dotenv.config();
import cors from 'cors';

const PORT = process.env.PORT
const app = express();
DbCon();                    // connecting database
const allowedOrigins = ["http://localhost:5173"];

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.use(express.json());
app.use(cookieParser());


app.use('/auth',AuthRoutes);
app.use('/notes',NotesRoutes)

app.get('/',(req,res) => {
  res.send('hello');
})

app.listen(PORT);