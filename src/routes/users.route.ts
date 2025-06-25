import { createUser, getAllUsers } from 'controllers/users.controller';

import express from 'express';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);

export default router;
