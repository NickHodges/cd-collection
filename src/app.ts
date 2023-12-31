import express from 'express';

import mongoose from 'mongoose';
import { CD, Track } from './models';
import dotenv from 'dotenv';

// Define an interface for the connection options
interface MongooseConnectionOptions extends mongoose.ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

dotenv.config();

// Then use that interface when you declare your mongooseOptions object
const mongooseOptions: MongooseConnectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const mongoUri: string = process.env.MONGO_URI!;
mongoose.connect(mongoUri, mongooseOptions);

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Endpoints

app.use(express.json()); // Enable JSON body parsing

// Create a new CD
app.post('/cds', async (req, res) => {
  console.log('Received POST request:', req.body);
  try {
    const cd = new CD(req.body);
    await cd.save();
    console.log('Saved CD:', cd);
    res.status(201).send(cd);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error adding CD:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
  }
});

// Get all CDs
app.get('/cds', async (req, res) => {
  try {
    const cds = await CD.find();
    res.send(cds);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single CD by id
app.get('/cds/:id', async (req, res) => {
  try {
    const cd = await CD.findById(req.params.id);
    if (!cd) {
      return res.status(404).send();
    }
    res.send(cd);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a CD by id
app.patch('/cds/:id', async (req, res) => {
  try {
    const cd = await CD.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cd) {
      return res.status(404).send();
    }
    res.send(cd);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a CD by id
app.delete('/cds/:id', async (req, res) => {
  try {
    const cd = await CD.findByIdAndDelete(req.params.id);
    if (!cd) {
      return res.status(404).send();
    }
    res.send(cd);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
