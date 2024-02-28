import { Repository } from "typeorm"
import { Like } from "../entity/Like"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"





export default new class LikeService {
    private readonly likeRepository: Repository<Like> = AppDataSource.getRepository(Like)

    async createLike( req: Request, res: Response ):Promise<Response> {
        try {
             const data = req.body
             const user_id = res.locals.loginSession.obj.id
             const getUser = await this.likeRepository.findOne({
                 where: {
                     user:{
                       id: user_id
                     },
                     thread: {
                        id:data.thread
                     }
                 }
             })
            //  console.log("like services",getUser)
            // console.log('data', data.thread)
            // console.log("user_id",user_id)

             if ( getUser){
                await this.likeRepository.delete(getUser)
                return res.status(200).json({message: "Success to delete like"})
             }
             const like = await this.likeRepository.create({
                 thread: data.thread,
                 user: res.locals.loginSession.obj.id
             })


             const result = await this.likeRepository.save(like)
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong in service",error })
        }
    }
    
}