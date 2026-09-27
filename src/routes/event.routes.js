import { Router } from 'express';
import { getEvents, createEvent } from '../controllers/event.controllers.js';
import passport from 'passport';
import { authorizeRole } from '../middlewares/auth.middleware.js';

const router = Router()

router.get('/', getEvents)
router.post('/', passport.authenticate('current', { session: false }), authorizeRole('admin','organizer'), createEvent)

export default router