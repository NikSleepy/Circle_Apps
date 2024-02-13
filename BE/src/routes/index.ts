import * as express from "express"
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import ThreadController from "../controllers/ThreadController";


const router = express.Router()

router.post("/register", AuthController.register)//mengirim data register / create akun
router.post("/login", AuthController.login)// mengirim data untuk di cek oleh BE ada usernya atau tidak

router.get("/users", UserController.getUsers)// mendapat semua data user
router.get("/users/:id", UserController.getUserById)// mengambil 1 data user by id
router.put("/users/update/:id", UserController.updateUser)// mengupdate data user sesuai id
router.delete("/users/delete/:id", UserController.deleteUser)//menghapus data user sesuai id 

router.post("/thread/post", ThreadController.createThread)
router.get("/thread", ThreadController.getThreads)
router.get("/thread/:id", ThreadController.getThreadById)
router.delete("/thread/delete/:id", ThreadController.deleteThread)



export default router;