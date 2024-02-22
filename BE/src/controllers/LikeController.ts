import { Request, Response } from "express"
import LikeServices from "../services/LikeServices"



export default new class LikeController {
    
    createLike( req: Request, res: Response ) {
        LikeServices.createLike(req,res)
    }
}