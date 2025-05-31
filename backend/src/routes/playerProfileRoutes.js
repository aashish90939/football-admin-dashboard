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

router.post('/', authMiddleware, requirePlayer, upload.single('photo'), createPlayerProfile);
router.patch('/', authMiddleware, requirePlayer, upload.single('photo'), updatePlayerProfile);
router.delete('/', authMiddleware, requirePlayer, deletePlayerProfile);

router.get('/:userId', getPlayerProfile);
router.get('/:userId/photo', getProfilePhoto);

router.get('/:id/full-profile', authMiddleware, getFullUserProfiles);




export default router;
