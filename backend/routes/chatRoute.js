import express from 'express';
import { getAIResponse } from '../controllers/chatController.js';
import auth from '../middleware/auth.js'; 

const chatRouter = express.Router();

chatRouter.post('/ask', auth, getAIResponse);

export default chatRouter;