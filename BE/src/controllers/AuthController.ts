import { Request, Response } from "express";
import AuthService from "../services/AuthServices";
import { registerSchema, loginSchema } from "../utils/validator/AuthValidator";

//fungsi controllers untuk mengubuat fungsi dari service dengan routes

export default new class AuthController {
    getUsers(arg0: string, getUsers: any) {
        throw new Error("Method not implemented.");
    }
    async register ( req: Request, res: Response ) {
        try {
            const data = req.body
            console.log("data",data)
            const { error, value } = registerSchema.validate(data)
            if (error) 
                return res.status(400).json(
                    error.details[0].message
                )
            
            const response = await AuthService.register(value)
            return res.status(201).json(response)

            
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    // async login ( req: Request, res: Response ) {
    //     try {
    //         const data = req.body
    //         const { error, value } = loginSchema.validate(data)
    //         if ( error ) return res.status(400).json(
    //             error.details[0].message
    //         )

    //         const response = await AuthService.login(value)
            
    //         return res.status(200).json(response)
    //     } catch ( error ) {
    //         return res.status(500).json(error)
    //     }
    // }
    login(req:Request, res:Response) {
        AuthService.login(req,res)
    }
}