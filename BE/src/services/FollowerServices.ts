import { Repository } from "typeorm"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express";


export default new class FollewerService {
    private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User);

    async followUser( req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            const user_id= res.locals.loginSession.obj.id

            console.log(data)
            console.log(user_id)

            //validate data
            // const { error, value } = followingSchema.validate(req.body);

            // if (error) {
            //     return res.status(400).json({
            //         code: 400,
            //         message: 'Invalid input. Please provide a valid user_id.'
            //     });
            // }

            const user = await this.UserRepository.findOne({
                where: {
                    id: user_id
                },
                relations: {
                    followings: true
                }
            });
            console.log("user login",user)

            const userToFollow = await this.UserRepository.findOne({
                where: {
                    id: data.user_id
                },
            })

            console.log("user to follow",userToFollow)

            if (!user || !userToFollow) {
                return res.status(404).json({
                    code: 404, message: 'User not found'
                })
            }

            const isAlreadyFollowing = user.followings.some(
                (followUser) => followUser.id === data.user_id

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
                relations: ['user_following']
            })

            if (!user) {
                return res.status(404).json({
                    code: 404, message: 'User not found'
                })
            }
            return res.status(200).json({
                code: 200,
                data: user.followings
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
                relations: ['user_following']
            })

            if (!user) {
                return res.status(404).json({
                    code: 404, message: 'User not found'
                })
            }
            return res.status(200).json({
                code: 200,
                data: user.followers

            })
        } catch ( errror ) {
            return res.status(500).json({
                code: 500,
                message: 'Internal server error in getFollowers service'
            })
        }
    }
}