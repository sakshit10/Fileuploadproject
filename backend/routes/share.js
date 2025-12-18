import express from 'express';
import crypto from 'crypto';
import File from '../models/File.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();


router.post('/:id/share', authMiddleware, async (req, res) => {
  try {
    const file = await File.findOne({
      _id: req.params.id,
      uploadedBy: req.user.userId
    });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

  
    const shareToken = crypto.randomBytes(32).toString('hex');
    
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    file.shareToken = shareToken;
    file.shareExpiresAt = expiresAt;
    file.isShared = true;
    
    await file.save();

    
    const shareUrl = `/api/share/download/${shareToken}`;

    res.json({
      message: 'Share link created',
      shareUrl,
      expiresAt: file.shareExpiresAt
    });
  } catch (error) {
    console.error('Share error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/download/:token', async (req, res) => {
  try {
    const file = await File.findOne({
      shareToken: req.params.token,
      shareExpiresAt: { $gt: new Date() },
      isShared: true
    });

    if (!file) {
      return res.status(404).json({ error: 'File not found or link expired' });
    }

    file.downloadCount = (file.downloadCount || 0) + 1;
    await file.save();

    res.download(file.path, file.originalName);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id/share', authMiddleware, async (req, res) => {
  try {
    const file = await File.findOne({
      _id: req.params.id,
      uploadedBy: req.user.userId
    });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    file.shareToken = null;
    file.shareExpiresAt = null;
    file.isShared = false;
    
    await file.save();

    res.json({ message: 'Share link revoked' });
  } catch (error) {
    console.error('Revoke share error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;