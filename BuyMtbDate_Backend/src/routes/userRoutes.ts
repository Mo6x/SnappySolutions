import express from "express";
import { getUsers } from "../controllers/getUsers";
import { deleteUser } from "../controllers/deleteUser";
import { protect } from '../middleware/jwt';
import { getUserProfile } from "../controllers/userProfile";


const router = express.Router();

router.get('/', protect, getUsers);
router.delete('/:id', protect, deleteUser);
router.get('/profile', protect, getUserProfile);

export default router;
