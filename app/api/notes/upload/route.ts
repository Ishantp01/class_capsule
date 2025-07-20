import { NextRequest, NextResponse } from 'next/server';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { connectToDB } from '@/lib/mongodb';
import Note from '@/models/Note';
import User from '@/models/User';

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
export async function POST(req: any, res: any) {
  try {
    // Create readable/writable request/response
    const reqBody: any = {};
    const reqRes = { req, res }; // wrapper

    // Run multer
    await runMiddleware(req, res, upload.single('file'));

    const file = req.file;
    if (!file) {
        console.log("No file uploaded");
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
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

    // Create public URL
    const fileUrl = `/uploads/${file.filename}`;

    // Save the note
    const note = await Note.create({
      title,
      topic,
      classDate: new Date(classDate),
      description,
      fileUrl,
      tags: tags?.split(',').map((tag: string) => tag.trim()),
      visibility,
      uploadedBy: user._id,
    });

    return NextResponse.json(
      { message: 'Note uploaded successfully', note },
      { status: 200 }
    );
  } catch (error: any) {
    // If file was uploaded but DB save fails, remove file
    if (req?.file) {
      fs.unlinkSync(path.join(uploadDir, req.file.filename));
    }
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
