import { Request, Response } from "express";
import ThreadService from "../services/ThreadService";
import { createThreadSchema } from "../utils/validator/ThreadValidator";



export default new class ThreadController {
   
    async createThread( req: Request, res: Response ):Promise<Response> {
        try {
            const id = req.params
            const data = req.body
            
            const { error, value } = createThreadSchema.validate(data)

            const response = await ThreadService.createThread(data);
            return res.status(200).json(response)

        } catch (error) {
            throw error
        }
    }
    async getThreads( req: Request, res: Response ):Promise<Response> {
        try {
            const response = await ThreadService.getAllThread();
            return res.status(200).json(response)

        } catch (error) {
            throw error
        }
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