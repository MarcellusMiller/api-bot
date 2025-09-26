import express from 'express';
import routes from './routes';

const app = express();

//rotas 

app.use("/", routes)

export default app;