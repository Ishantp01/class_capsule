// CLASS_CAPSULE/models/User.ts
import mongoose, { Schema, models, model, Document } from 'mongoose';

// Define the interface for a User document
export interface IUser extends Document {
  email: string;
  password: string; // Storing hashed password
  fullName?: string;
  college?: string;
  course?: string;
  year?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema
const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false, // Don't return password by default on queries
  },
  fullName: {
    type: String,
  },
  college: {
    type: String,
  },
  course: {
    type: String,
  },
  year: {
    type: String,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// If the model already exists, use it; otherwise, create it
const User = (models.User || model<IUser>('User', UserSchema)) as mongoose.Model<IUser>;

export default User;