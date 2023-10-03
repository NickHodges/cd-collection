import mongoose from 'mongoose';

// Define the schema for a track
const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
});

// Define the schema for a CD
const cdSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  tracks: [trackSchema],
});

// Create models based on the schemas
const Track = mongoose.model('Track', trackSchema);
const CD = mongoose.model('CD', cdSchema);

export { Track, CD };
