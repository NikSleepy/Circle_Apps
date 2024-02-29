import { Repository } from "typeorm"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express";


export default new class FollewerService {
    private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User);

    async followUser( req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params
            const data = parseInt(id.id)
            const user_id= res.locals.loginSession.obj.id

            // console.log(data)
            // console.log(user_id)

            //validate data
            // const { error, value } = followingSchema.validate(req.body);

            // if (error) {
            //     return res.status(400).json({
            //         code: 400,
            //         message: 'Invalid input. Please provide a valid user_id.'
            //     });
            // }
            // console.log("user yg mau di follow",data)
            // console.log("user login",user_id)

            const user = await this.UserRepository.findOne({
                where: {
                    id: user_id
                },
                relations: {
                    followings: true
                }
            });
            // console.log("user login",user)

            const userToFollow = await this.UserRepository.findOne({
                where: {
                    id: data
                },
            })

            if( user.id === userToFollow.id ){
                return res.status(400).json({
                    message:"can't following my self"
                })
            }
            // console.log("user to follow",userToFollow)

            if (!user || !userToFollow) {
                return res.status(404).json({
                    code: 404, message: 'User not found'
                })
            }
            

            const isAlreadyFollowing = user.followings.some(
                (followUser) => followUser.id === data

            );

            if (isAlreadyFollowing) {
                user.followings = user.followings.filter(
                    (followUser) => followUser.id !== userToFollow.id
                )
            } else {
                user.followings.push(userToFollow)
            }

            await this.UserRepository.save(user);

            const message = isAlreadyFollowing ? 'Unfollowed' : 'Followed';
            return res.status(200).json({
                code: 200,
                message
            })
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: 'Internal server error in followUser service'
            })
        }
    }

    async getFollowings ( req: Request, res: Response): Promise<Response> {
        try {

            const user_id = res.locals.loginSession.obj.id
            const user = await this.UserRepository.findOne({
                where: {
                    id: user_id
                },
                relations: {
                    followings:true
                }
            })
            const following = await this.UserRepository.find({
                where: {
                    followers: { id:user_id }
                },
            })

            // const isFollowed =  user.followers.some( (followers) => followers.id === user_id)

            // console.log(isFollowed)
            const followings = user.followings.map((item) => {

                let a = false;
                
                following.map((data)=>{
                    if(item.id === data.id){
                        a=true;
                    }

                })

                
                return {
                    id: item.id,
                    username: item.username,
                    fullName: item.fullName,
                    photo: item.photo_profile,
                    followings:a
                }
            })

            

            if (!user) {
                return res.status(404).json({
                    code: 404, message: 'User not found'
                })
            }

           
            return res.status(200).json({
                code: 200,
                data: followings
            })
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: 'Internal server error in getFollowings service'
            })
        }
    }

    async getFollowers ( req: Request, res: Response): Promise<Response> {
        try {
            const user_id = res.locals.loginSession.obj.id
            const user = await this.UserRepository.findOne({
                where: {
                    id: user_id
                },
                relations: {
                    followers:true
                }
            })
            console.log("followers",user)

            if (!user) {
                return res.status(404).json({
                    code: 404, message: 'User not found'
                })
            }

            const following = await this.UserRepository.find({
                where: {
                    followers: { id:user_id }
                },
            })
            const followers = user.followers.map((item) => {
                                
                let a = false;
                
                following.map((data)=>{
                    if(item.id === data.id){
                        a = true;
                    }
                })
                return {
                    id:item.id,
                    username: item.username,
                    fullName: item.fullName,
                    photo: item.photo_profile,
                    followers:a
                }
            })
            return res.status(200).json({
                code: 200,
                data: followers 

            })
        } catch ( errror ) {
            return res.status(500).json({
                code: 500,
                message: 'Internal server error in getFollowers service'
            })
        }
    }


}