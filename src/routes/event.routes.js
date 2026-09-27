import { Router } from 'express';
import { getEvents, createEvent } from '../controllers/event.controllers.js';
import passport from 'passport';

const router = Router()

router.get('/', getEvents)
router.post('/', passport.authenticate('current',{session:false}) , createEvent)

export default router