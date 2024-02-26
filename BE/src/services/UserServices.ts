import { Repository } from "typeorm"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"



export default new class UserService {
    private readonly userRepository: Repository<User> = AppDataSource.getRepository(User)
    async getUsers() {
        try {
            const getuser = await this.userRepository.find({
                relations: {
                    threads: true,
                    reply: true,
                    likes: true
                },
                select: {
                    id: true,
                    username: true,
                    fullName: true,
                    photo_profile: true
                }
            });
            return {
                message: "Success to get users",
                data: getuser
            }
            
        } catch (error) {
            throw error
        }
        
    }

    async getUserById( id: any ) {
        try {
            
            const getuser = await this.userRepository.createQueryBuilder("user").where(id).getOneOrFail();
            return {
                message: "Success to get user",
                data: getuser
            }
        } catch (error) {
            throw error
        }
        
    }

    async updateUser( data: object, id: any) {
        try {
            const updateUser = await this.userRepository.createQueryBuilder().update(User).set(data).where(id).execute();
            return {
                message: "Success to update user",
                data: updateUser
            }
        } catch (error) {
            throw error
        }
        
    } 

    async userLogin( req:Request, res:Response):Promise<Response> {
        const id = res.locals.loginSession.obj.id
        const user = await this.userRepository.findOneBy({
            id
        })
        return res.status(200).json(user)

    }

    async deleteUser( id: any ) {
        try {
            const deleteUser = await this.userRepository.createQueryBuilder().delete().from(User).where(id).execute();
            return {
                message: "Success to delete user",
                data: deleteUser
            }
        } catch (error) {
            throw error
        }
    }

}