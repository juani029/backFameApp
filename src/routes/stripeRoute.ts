import {Router} from 'express';
import {postStripe} from '../controllers/stripeController';

const router = Router();

router.post('/', postStripe);

export default router;