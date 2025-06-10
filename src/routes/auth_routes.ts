import { Router } from "express";
import { getAllUsers, getTimeToken, login, updateToken, getUserByUsername, saveUser, getUserById,updateUser, deleteUser, createProduct } from "../controllers/auth_controller";
import { createUser } from "../controllers/auth_controller";

const router = Router();

router.post('/login', login);
router.get('/getTime/:userId', getTimeToken);
router.patch('/update/:userId', updateToken);
router.get('/users', getAllUsers);
// router.post('/users', saveUser);
router.get('/users/name/:userName', getUserByUsername);
router.post('/users', createUser);
// router.get('/users/h/:userId', getUserByUsername);
router.get('/users/:id', getUserById);


router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.post('/product', createProduct);


/*
    Utiliza el endpoint 
*/
export default router;
