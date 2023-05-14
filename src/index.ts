import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import routes from '../src/routes/cliente.routes';
import route from '../src/routes/livro.routes';
import rout from '../src/routes/emprestimo.routes';

export const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(route);
app.use(rout);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

// async function main() {
//   try {
//     await prisma.$connect();
//     console.log('Connected to database.');
//   } catch (error) {
//     console.error('Error connecting to database:', error);
//   }
// }

//main();
