import { Equal, Not, Repository } from "typeorm"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"



export default new class UserService {
    private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User)
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
            







  

            // console.log("follower",follower)
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

            // const map = following.filter((items) => items.followings === user_id)
            // console.log(following)

            // const mapping = getuser.map((items) => {
            //     const tt = following.filter((data)=>{
            //         items.id != data.followers
            //     })
                
            //     return {
            //         id: items.id,
            //         username:items.username,
            //         fullName:items.fullName,
            //         photo_profile:items.photo_profile,
            //         isFollow:false
            //     }
            // })




            
            // const filter = getuser.filter((data) => {
            //     return data.followers != user_id
            // })
            // console.log("following",following)
            
            
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
            // console.log(getuser)
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

    async updateUser( data: object, id: any) {
        try {
            const updateUser = await this.UserRepository.createQueryBuilder().update(User).set(data).where(id).execute();
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
        const user = await this.UserRepository.findOneBy({
            id
        })
        // console.log(user)
        return res.status(200).json(user)

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