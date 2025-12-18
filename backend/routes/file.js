import express from 'express';
import multer from 'multer';
import path from 'path';
import File from '../models/File.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } 
});


router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimeType: req.file.mimetype,
      uploadedBy: req.user.userId
    });

    await file.save();

    res.status(201).json({
      message: 'File uploaded successfully',
      file: {
        id: file._id,
        filename: file.filename,
        originalName: file.originalName,
        size: file.size,
        mimeType: file.mimeType,
        uploadDate: file.uploadDate
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/my-files', authMiddleware, async (req, res) => {
  try {
    const files = await File.find({ uploadedBy: req.user.userId })
      .sort({ uploadDate: -1 });
    
    res.json(files);
  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const file = await File.findOne({
      _id: req.params.id,
      uploadedBy: req.user.userId
    });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.json(file);
  } catch (error) {
    console.error('Get file error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete file (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const file = await File.findOneAndDelete({
      _id: req.params.id,
      uploadedBy: req.user.userId
    });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;