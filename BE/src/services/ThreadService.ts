import { Repository } from "typeorm"
import { Thread } from "../entity/Thread"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"


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
            
            const getThread = await this.threadRepository.find({
                order: { created_at: "DESC" },
                relations: { reply: true },
            select:{
                user: {
                    id:true,
                    username: true,
                    fullName: true,
                    photo_profile: true
                },
                reply: {
                    id: true,
                    content: true,
                    created_at: true,
                    file_reply: true
                },
                likes: {
                    id: true
                    
                }
            }
            });
            return res.status(200).json({
                message: "Success to get thread",
                data: getThread
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
                    }
                }

            })
            console.log(getThread)
            return {
                message: "Success to get thread",
                data: getThread
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
