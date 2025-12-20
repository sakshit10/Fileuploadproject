import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  compressedSize: { type: Number },
  path: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sharedWith: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['viewer', 'owner'], default: 'viewer' },
    sharedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date }
  }],
  shareLinks: [{
    token: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
    accessCount: { type: Number, default: 0 }
  }],
  isCompressed: { type: Boolean, default: false },
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model('File', fileSchema);
