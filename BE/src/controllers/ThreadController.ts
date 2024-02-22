import { Request, Response } from "express";
import ThreadService from "../services/ThreadService";
import CloudinaryConfig from "../libs/Cloudinary";
import { log } from "console";



export default new class ThreadController {
   
    async createThread( req: Request, res: Response ):Promise<Response> {
        try {
            const data = req.body
            data.user = res.locals.loginSession.obj.id
            const img = null;
            
                data.image_thread = res.locals.filename
                if(data.image_thread){
                    
                    const cloudinary = await CloudinaryConfig.destination(data.image_thread)
                    data.image_thread = cloudinary
                }

            // const { error, value } = createThreadSchema.validate(data)
            // if ( !res.locals.filename ) {
            //      value = {
            //         content: req.body.content,
            //         user: res.locals.loginSession.obj.id
            //     }
            // } else {
            //      value = {
            //         content: req.body.content,
            //         user: res.locals.loginSession.obj.id,
            //         image_thread: cloudinary
            //     }
            // }
            
            const response = await ThreadService.createThread(data);
            return res.status(200).json(response)

        } catch (error) {
            throw error
        }
    }
    getThreads( req: Request, res: Response ) {
        // try {
        //     const response = await ThreadService.getAllThread();
        //     return res.status(200).json(response)

        // } catch (error) {
        //     throw error
        // }
        ThreadService.getAllThread(req,res)

    }

    async getThreadById( req: Request, res: Response):Promise<Response> {
        try {
            const id = parseInt(req.params.id)
            const response = await ThreadService.getThreadById(id);
            return res.status(200).json(response)
        } catch (erorr) {
            throw erorr
        }
    }

    async deleteThread( req: Request, res: Response ):Promise<Response> {
        try {
            const id = parseInt(req.params.id)
            const response = await ThreadService.deleteThread(id);
            return res.status(200).json(response)
        } catch (error) {
            throw error
        }
    }

}