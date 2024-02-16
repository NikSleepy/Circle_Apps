import { Repository } from "typeorm"
import { Thread } from "../entity/Thread"
import { AppDataSource } from "../data-source"


export default new class ThreadService {
    private readonly threadRepository: Repository<Thread> = AppDataSource.getRepository(Thread)

    async getAllThread() {
        try {
            // const getThread = await this.threadRepository.createQueryBuilder("thread").getMany();
            const getThread = await this.threadRepository.find({
                order: { created_at: "DESC" },
                relations: { user:true },
            select:{
                user: {
                    id:true,
                    username: true,
                    fullName: true,
                    photo_profile: true
                }
            }
            });
            return {
                message: "Success to get threads",
                data: getThread
            }
        } catch (error) {
            throw error
        }

    }

    async getThreadById( id: any ) {
        try {
            
            // const getThread = await this.threadRepository.createQueryBuilder("thread").where(id).getOneOrFail();
            const getThread = await this.threadRepository.findOne({
                where: { id },
                relations:{
                    user: true
                }, select:{
                    user: {
                        id: true,
                        username: true,
                        fullName: true,
                        photo_profile: true
                    }
                }
            })
            return {
                message: "Success to get thread",
                data: getThread
            }
        } catch (erorr) {
            throw erorr
        }
    }

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


    async deleteThread( id: any ) {
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
