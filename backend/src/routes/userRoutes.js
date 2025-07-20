import express from 'express';
import { registerUser, loginUser ,getAcceptedUsers,getPendingUsers } from '../controllers/userController.js';
import { getUsers ,deleteUserById} from '../controllers/userController.js';
import { updateUserStatus } from '../controllers/userController.js';



import { getFullUserProfiles } from '../controllers/playerProfileController.js'; // Import the new controller function
import authMiddleware from '../middleware/authMiddleware.js';
import requireAdmin from '../middleware/requireAdmin.js';
import { updateUserDetails } from '../controllers/playerProfileController.js';



const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers); //

router.get('/accepted', getAcceptedUsers); 
router.get('/pending', getPendingUsers);    


//for admin dashboard
router.patch('/:id/status', updateUserStatus);  // // Update user status based on ID and status value

router.get("/full-profiles", getFullUserProfiles); // ✅ add this

router.delete('/:id', deleteUserById);

router.patch('/:id', authMiddleware, requireAdmin, updateUserDetails); // ✅ Update user details by ID



export default router;
