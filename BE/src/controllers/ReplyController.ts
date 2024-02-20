import { Request, Response } from "express";
import ReplyServices from "../services/ReplyServices";



export default new class ReplyController {

    createReplies( req: Request, res: Response ) {
        ReplyServices.createReply(req,res)
    }

    getAllReplies( req: Request, res: Response ) {
        ReplyServices.getAllReply(req,res)
    }
    delete( req: Request, res: Response ) {
        ReplyServices.deleteReply(req,res)
    }
    
}