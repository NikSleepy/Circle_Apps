import { Repository } from "typeorm"
import { Thread } from "../entity/Thread"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { array } from "joi"


export default new class ThreadService {
    private readonly threadRepository: Repository<Thread> = AppDataSource.getRepository(Thread)
    
    async createThread( data:object ) {
        try {
    
            const createThread = await this.threadRepository.save(data);
            return {
                message: "Success to create thread",
                data: createThread
            }
        } catch (error) {
            throw error 
        }
    }
    async getAllThread( req: Request, res: Response ):Promise<Response> {
        try {
            // const getThread = await this.threadRepository.createQueryBuilder("thread").getMany();
            const user = res.locals.loginSession.obj.id
            const getThread = await this.threadRepository.find({
                order: { created_at: "DESC" },
                relations: [  
                    "user",
                    "reply",
                    "reply.user",
                    "user.followings",
                    "likes",
                    ],
                
            select:{
                user: {
                    id:true,
                    username: true,
                    fullName: true,
                    photo_profile: true
                },
                reply: 
                {
                    id: true,
                    content: true,

                }
                ,
                likes: {
                    id: true
                    
                },
                
                
            }
            });

            // console.log(user)
             
            const Threads = getThread.map((thread) => {

                return {
                    id: thread.id,
                    content: thread.content,
                    created_at: thread.created_at,
                    image_thread: thread.image_thread,
                    user: thread.user,
                    numberOfReply: thread.reply.length,
                    likes: thread.likes.length
                }
            })

           
            return res.status(200).json({
                message: "Success to get thread",
                data: Threads
            })
        } catch (error) {
            throw error
        }

    }

    async getThreadById( id: number) {
        try {
            
            // const getThread = await this.threadRepository.createQueryBuilder("thread").where(id).getOneOrFail();
            const getThread = await this.threadRepository.findOne(
                {
                where: { id },
                relations:[  
                "user",
                "reply",
                "reply.user",
                "likes"
                ]
                , select:{
                    user: {
                        id: true,
                        username: true,
                        fullName: true,
                        photo_profile: true
                    },
                    reply: {
                        id: true,
                        content: true,
                        created_at: true,
                        file_reply: true,
                        user: {
                            id: true,
                            username: true,
                            fullName: true,
                            photo_profile: true
                        }
                    },
                    likes: {
                        id: true
                    }
                }

            })

            const ThreadId = {
                id: getThread.id,
                content: getThread.content,
                created_at: getThread.created_at,
                image_thread: getThread.image_thread,
                user: getThread.user,
                reply: getThread.reply,
                numberOfReply: getThread.reply.length,
                likes: getThread.likes.length

            }
            
            
            return {
                message: "Success to get thread",
                data: ThreadId
            }
            
        } catch (erorr) {
            throw erorr
        }
    }



    async deleteThread( id: number ) {
        try {
            
            // const deleteThread = await this.threadRepository.createQueryBuilder().delete().from(Thread).where(id).execute();
            const deleteThread = await this.threadRepository.delete(id)
            return {
                message: "Success to delete thread",
                data: deleteThread
            }
        } catch (error) {
            throw error
        }
    }


}
