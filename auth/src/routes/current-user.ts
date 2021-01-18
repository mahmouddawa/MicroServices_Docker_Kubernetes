import express from 'express';
import { currentUser } from '@moudtickets/common';

const router = express .Router();

router.get('/api/users/currentuser',  currentUser,  (req, res)=>{
res.send({ currentUser : req.currentUser || null });    
});

console.log('error with the current user');
export { router as curretnUserRouter };
