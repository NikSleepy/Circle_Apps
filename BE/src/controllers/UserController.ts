
import { Request, Response } from "express";
import UserServices from "../services/UserServices"
import { updateUserSchema } from "../utils/validator/UserValidator"

export default new class UserController {
    

    async getUsers( req: Request, res: Response ):Promise<Response> {
        try {
            const response = await UserServices.getUsers();
            return res.status(200).json(response)

        } catch (error) {

            throw error
        }
        
    }

    async getUserById( req: Request, res: Response ):Promise<Response> {
        try {
            const id = req.params
            const response = await UserServices.getUserById(id);
            return res.status(200).json(response)
        } catch (error) {
            throw error
        }
    }

    async updateUser( req: Request, res: Response ):Promise<Response> {
        try {
            const id = req.params
            const data = req.body
            const { error, value } = updateUserSchema.validate(data)
            if (!value) return res.status(400).json(error.details[0].message)

            const response = await UserServices.updateUser(data, id);
            return res.status(200).json(response)
        } catch (error) {
            throw error
        }
    }

    userLogin( req:Request, res:Response ) {
        UserServices.userLogin(req,res)
    }
    

    async deleteUser( req: Request, res: Response ):Promise<Response> {
        try {
            const id = req.params
            const response = await UserServices.deleteUser(id);
            return res.status(200).json(response)
        } catch (error) {
            throw error
        }
    }
}