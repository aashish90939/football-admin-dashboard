import express from 'express';
import upload from '../middleware/upload.js';
import authMiddleware from '../middleware/authMiddleware.js';
import requirePlayer from '../middleware/requirePlayer.js';

import {
  createPlayerProfile,
  getPlayerProfile,
  updatePlayerProfile,
  deletePlayerProfile,
  getProfilePhoto,
  getFullUserProfiles,
} from '../controllers/playerProfileController.js';

const router = express.Router();

// Create new profile
router.post('/', authMiddleware, requirePlayer, upload.single('photo'), createPlayerProfile);

// Update existing profile
router.put('/:id', authMiddleware, requirePlayer, upload.single('photo'), updatePlayerProfile);

// Delete profile
router.delete('/', authMiddleware, requirePlayer, deletePlayerProfile);

// Get individual profile or photo
router.get('/:userId', getPlayerProfile);
router.get('/:userId/photo', getProfilePhoto);

// Admin-only: get all user profiles with photo in base64
router.get('/:id/full-profile', authMiddleware, getFullUserProfiles);

export default router;
