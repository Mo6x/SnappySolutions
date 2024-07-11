import express from "express";
import { login } from "../auths/authLogin";
import { register } from "../auths/authRegisteration";


const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
