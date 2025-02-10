import { Router } from "express";
import { listUsers, findUser, createUser, updateUser, deleteUser } from "../controllers/UserController";

const router: Router = Router();

router.post('/', createUser);
router.get('/', listUsers);
router.get('/:id', findUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;