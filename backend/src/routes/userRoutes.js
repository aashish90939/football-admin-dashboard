import express from 'express';
import { registerUser, loginUser ,getAcceptedUsers,getPendingUsers } from '../controllers/userController.js';
import { getUsers } from '../controllers/userController.js';
import { updateUserStatus } from '../controllers/userController.js';
const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers); //

router.get('/accepted', getAcceptedUsers); 
router.get('/pending', getPendingUsers);    


//for admin dashboard
router.patch('/:id/status', updateUserStatus);  // // Update user status based on ID and status value





export default router;
