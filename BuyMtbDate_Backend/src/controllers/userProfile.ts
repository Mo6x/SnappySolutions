import { Request, Response } from "express";
import User, { IUser } from "../models/User";



export const getUserProfile = async (req: Request|any, res: Response): Promise<void> => {
   try {
     const user = await User.findById(req.userId).select('-password');
     if (!user) {
       res.status(404).json({ message: 'User not found' });
       return;
     }
     res.json(user);
   } catch (error) {
     console.error('Error fetching user profile:', error);
     res.status(500).send('Server Error');
   }
 };