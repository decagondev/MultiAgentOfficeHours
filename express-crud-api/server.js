
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { openDb } from './database.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/persons', async (req, res) => {
  const db = await openDb();
  const persons = await db.all('SELECT * FROM Person');
  res.json(persons);
});

app.get('/persons/:id', async (req, res) => {
  const db = await openDb();
  const person = await db.get('SELECT * FROM Person WHERE id = ?', [req.params.id]);
  res.json(person);
});

app.post('/persons', async (req, res) => {
  const { name, location, age } = req.body;
  const db = await openDb();
  const result = await db.run('INSERT INTO Person (name, location, age) VALUES (?, ?, ?)', [name, location, age]);
  res.json({ id: result.lastID });
});

app.put('/persons/:id', async (req, res) => {
  const { name, location, age } = req.body;
  const db = await openDb();
  await db.run('UPDATE Person SET name = ?, location = ?, age = ? WHERE id = ?', [name, location, age, req.params.id]);
  res.json({ message: 'Person updated successfully' });
});

app.delete('/persons/:id', async (req, res) => {
  const db = await openDb();
  await db.run('DELETE FROM Person WHERE id = ?', [req.params.id]);
  res.json({ message: 'Person deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

