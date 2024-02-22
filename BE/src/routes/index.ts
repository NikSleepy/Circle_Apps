import * as express from "express"
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import ThreadController from "../controllers/ThreadController";
import Auth from "../middlewares/Auth";
import ReplyController from "../controllers/ReplyController";
import UploadFiles from "../middlewares/UploadFile";
import LikeController from "../controllers/LikeController";

const router = express.Router()

router.post("/register", AuthController.register)//mengirim data register / create akun
router.post("/login", AuthController.login)// mengirim data untuk di cek oleh BE ada usernya atau tidak

router.get("/users", UserController.getUsers)// mendapat semua data user
router.get("/users/:id", UserController.getUserById)// mengambil 1 data user by id
router.put("/users/update/:id", UserController.updateUser)// mengupdate data user sesuai id
router.delete("/users/delete/:id", UserController.deleteUser)//menghapus data user sesuai id 

router.post("/thread/post",Auth.Auth, UploadFiles.upload('image_thread'), ThreadController.createThread)// post thread
router.get("/thread", ThreadController.getThreads)// get all thred
router.get("/thread/:id", ThreadController.getThreadById)// get thread by id
router.delete("/thread/delete/:id", ThreadController.deleteThread) // delete thread

router.post("/reply/post", Auth.Auth, ReplyController.createReplies)// post comment
router.get("/reply", ReplyController.getAllReplies)// get comment
router.delete("/reply/delete/:id", ReplyController.delete)// delete comment

router.post("/thread/like", Auth.Auth, LikeController.createLike)

export default router;