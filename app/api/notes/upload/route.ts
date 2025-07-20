import { NextRequest, NextResponse } from 'next/server';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { connectToDB } from '@/lib/mongodb';
import Note from '@/models/Note';
import User from '@/models/User';

 connectToDB();
export const config = {
  api: {
    bodyParser: false,
  },
};

// Create upload directory if it doesn't exist
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Helper to run multer in a promise for App Router
function runMiddleware(req: any, res: any, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) reject(result);
      else resolve(result);
    });
  });
}

// Main handler
// ...existing code...

export async function POST(req: any, res: any) {
  try {
    await runMiddleware(req, res, upload.array('file'));

    const files = req.files;
    if (!files || files.length === 0) {
      console.log("No files uploaded");
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const {
      title,
      topic,
      classDate,
      description,
      tags,
      visibility,
      uploadedBy,
    } = req.body;

    await connectToDB();

    // Find or create dummy user
    let user = await User.findById(uploadedBy);
    if (!user) {
      user = await User.create({
        _id: uploadedBy,
        fullName: 'Demo User',
        email: 'demo@example.com',
        college: 'Demo College',
        course: 'Demo Course',
        year: 1,
      });
    }

    // Create public URLs for all files
    const fileUrls = files.map((file: any) => `/uploads/${file.filename}`);

    // Save the note
    const note = await Note.create({
      title,
      topic,
      classDate: new Date(classDate),
      description,
      fileUrl: fileUrls, // store array
      tags: tags?.split(',').map((tag: string) => tag.trim()),
      visibility,
      uploadedBy: user._id,
    });

    return NextResponse.json(
      { message: 'Note uploaded successfully', note },
      { status: 200 }
    );
  } catch (error: any) {
    // If file was uploaded but DB save fails, remove files
    if (req?.files && Array.isArray(req.files)) {
      req.files.forEach((file: any) => {
        fs.unlinkSync(path.join(uploadDir, file.filename));
      });
    }
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
// ...existing code...