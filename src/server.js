import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const PORT = process.env.APPLICATION_PORT || 3007;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
