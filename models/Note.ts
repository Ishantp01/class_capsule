// CLASS_CAPSULE/models/Note.ts
import mongoose, { Schema, models, model, Document } from 'mongoose';

// Define the interface for a Note document
export interface INote extends Document {
  title: string;
  classDate: Date; // Stored as a Date object
  topic?: string;
  description?: string;
  fileUrl: string;   // URL/path to the uploaded file
  tags?: string[];
  visibility?: 'public' | 'private'; // Enforce specific values
  summary?: string; // For Gemini-generated summary
  uploadedBy: mongoose.Types.ObjectId; // Reference to the User who uploaded it
  createdAt: Date;
  updatedAt: Date;
}

// Define the Note schema
const NoteSchema = new Schema<INote>({
  title: {
    type: String,
    required: [true, 'Please provide a title for the note (Subject/Topic)'],
  },
  classDate: {
    type: Date,
    required: [true, 'Please provide the class date'],
  },
  topic: {
    type: String,
  },
  description: {
    type: String,
  },
  fileUrl: {
    type: String,
    required: [true, 'File URL is required'], // Path to where the file is stored
  },
  tags: {
    type: [String], // Array of strings
  },
  visibility: {
    type: String,
    enum: ['public', 'private'], // Only allows these values
    default: 'public',
  },
  summary: {
    type: String,
  },
  uploadedBy: {
    type: Schema.Types.ObjectId, // This links to the User model
    ref: 'User', // The name of the User model
    required: [true, 'Uploader ID is required'],
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

// If the model already exists, use it; otherwise, create it
const Note = (models.Note || model<INote>('Note', NoteSchema)) as mongoose.Model<INote>;

export default Note;