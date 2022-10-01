import express, { Express } from 'express';
import 'dotenv/config';
import cors from 'cors';
import routes from './providers/routeProvider';

const PORT: any = process.env.APPLICATION_PORT || 3005;

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
