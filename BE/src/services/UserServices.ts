import { Equal, Not, Repository } from "typeorm"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { it } from "node:test"



export default new class UserService {
    private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User)

    async getUserAll( req: Request, res: Response) {
        try {
            const user_id = res.locals.loginSession.obj.id
            const getuser = await this.UserRepository.find({
                where: {
                    id: Not(user_id),

                },
                relations:{
                    followers:true,
                
                },
                select: {
                    id: true,
                    username: true,
                    fullName: true,
                    photo_profile: true,
                    followings:{
                        id:true
                    },

                }
            });
            

            const following = await this.UserRepository.find({
                where:{
                    id:Not(user_id),
                    followers:{
                        id: user_id
                    }
                },
                select:{
                    id:true,
                    username:true,
                    fullName:true,
                    photo_profile:true
                }
            })

            
            const mapping = getuser.map((item) => {
                
                let a = false;
                
                following.map((data)=>{
                    if(item.id === data.id){
                        a=true;
                    }
                    // console.log(data)

                })
                // if(following)
                return {
                    id:item.id,
                    username:item.username,
                    fullName:item.fullName,
                    photo_profile:item.photo_profile,
                    isFollow: a

                }
            })
            return res.status(200).json({
                message: "Success to get users",
                data: mapping
            })
        } catch (error) {
            return res.status(400).json({
                message:`error in getUser ${error}`
            })
        }
    }

    async getUsers( req: Request, res: Response ) {
        try {
            const user_id = res.locals.loginSession.obj.id
            const getuser = await this.UserRepository.find({
                where: {
                    id: Not(user_id),
                },
                relations:{
                    followers:true,
                },
                select: {
                    id: true,
                    username: true,
                    fullName: true,
                    photo_profile: true,
                    followings:{
                        id:true
                    },

                }
            });
            

            const following = await this.UserRepository.find({
                where:{
                    id:Not(user_id),
                    followers:{
                        id: user_id
                    }
                },
                select:{
                    id:true,
                    username:true,
                    fullName:true,
                    photo_profile:true
                }
            })

            
            const mapping = getuser.map((item) => {

                let follow = false;
                
                following.map((data)=>{
                    if(item.id === data.id){
                        follow=true;
                    }
                    // console.log(data)

                })

                return {
                    id:item.id,
                    username:item.username,
                    fullName:item.fullName,
                    photo_profile:item.photo_profile,
                    isFollow: follow

                }
            })

            const userFilter = mapping.filter((items)=> items.isFollow === false)

            return res.status(200).json({
                message: "Success to get users",
                data: userFilter
            })
        } catch (error) {
            return res.status(400).json({
                message:`error in getUser ${error}`
            })
        }
        
    }

    async getUserById( id: any ) {
        try {
            
            const getuser = await this.UserRepository.createQueryBuilder("user").where(id).getOneOrFail();
            return {
                message: "Success to get user",
                data: getuser
            }
        } catch (error) {
            throw error
        }
        
    }

    async updateUser( data: object, id: string) {
        try {
            const id_string = { id : id}
            const updateUser = await this.UserRepository.createQueryBuilder().update(User).set(data).where(id_string).execute();
            return {
                message: "Success to update user",
                data: updateUser
            }

        } catch (error) {
            return {
                message:"error",
                error:error
            }
        }
        
    } 

    async userLogin( req:Request, res:Response):Promise<Response> {
        const id = res.locals.loginSession.obj.id
        const user = await this.UserRepository.find({
            where: {
                id: id
            },
            relations:['followings','followers'],
            select:{
                id:true,
                username:true,
                fullName:true,
                photo_cover:true,
                photo_profile:true,
                email:true,
                description:true,
                followers:true,
                followings:true
            }

        })

        const data = user.map((items) => {
            return {
                id:items.id,
                username:items.username,
                fullName:items.fullName,
                email:items.email,
                photo_cover:items.photo_cover,
                photo_profile:items.photo_profile,
                description:items.description,
                followers:items.followers.length,
                followings:items.followings.length
            }
        })
        // console.log(user)
        return res.status(200).json(data)

    }

    async deleteUser( id: any ) {
        try {
            const deleteUser = await this.UserRepository.createQueryBuilder().delete().from(User).where(id).execute();
            return {
                message: "Success to delete user",
                data: deleteUser
            }
        } catch (error) {
            throw error
        }
    }

}