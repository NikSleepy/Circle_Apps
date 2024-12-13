import { Repository } from 'typeorm';
import { Thread } from '../entity/Thread';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { array } from 'joi';
import { Like } from '../entity/Like';
import { User } from '../entity/User';

export default new (class ThreadService {
  private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);
  private readonly likeRepository: Repository<Like> =
    AppDataSource.getRepository(Like);
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async createThread(data: object) {
    try {
      const createThread = await this.threadRepository.save(data);
      return {
        message: 'Success to create thread',
        data: createThread,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllThread(req: Request, res: Response): Promise<Response> {
    try {
      const user = res.locals.loginSession.obj.id;
      const getThread = await this.threadRepository.find({
        order: { created_at: 'DESC' },
        relations: ['user', 'reply', 'reply.user', 'user.followings', 'likes'],

        select: {
          user: {
            id: true,
            username: true,
            fullName: true,
            photo_profile: true,
          },
          reply: {
            id: true,
            content: true,
          },
          likes: {
            id: true,
            thread: {
              id: true,
            },
          },
        },
      });

      const like = await this.likeRepository.find({
        where: {
          user: {
            id: user,
          },
        },
        relations: ['thread', 'user'],
        select: {
          id: true,
          thread: {
            id: true,
          },
        },
      });

      const Threads = getThread.map((thread) => {
        let fate = false;

        like.map((items) => {
          if (thread?.id === items?.thread?.id) {
            fate = true;
          }
        });

        return {
          id: thread.id,
          content: thread.content,
          created_at: thread.created_at,
          image_thread: thread.image_thread,
          user: thread.user,
          numberOfReply: thread.reply.length,
          likes: thread.likes.length,
          isLikes: fate,
        };
      });

      return res.status(200).json({
        message: 'Success to get thread',
        data: Threads,
      });
    } catch (error) {
      throw error;
    }
  }

  async getThreadById(id: number, user_id: number) {
    try {
      // const getThread = await this.threadRepository.createQueryBuilder("thread").where(id).getOneOrFail();
      const getThread = await this.threadRepository.findOne({
        where: { id },
        relations: ['user', 'reply', 'reply.user', 'likes'],
        select: {
          user: {
            id: true,
            username: true,
            fullName: true,
            photo_profile: true,
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
              photo_profile: true,
            },
          },
          likes: {
            id: true,
          },
        },
      });

      const likes = await this.likeRepository.find({
        where: {
          thread: {
            id: id,
          },
          user: {
            id: user_id,
          },
        },
        relations: ['thread', 'user'],
        select: {
          id: true,
          user: {
            id: true,
          },
          thread: {
            id: true,
          },
        },
      });

      let islake = false;

      likes.map((items) => {
        if (items.user.id === user_id) {
          islake = true;
        }
      });

      const data = {
        id: getThread.id,
        content: getThread.content,
        created_at: getThread.created_at,
        image_thread: getThread.image_thread,
        user: getThread.user,
        reply: getThread.reply,
        numberOfReply: getThread.reply.length,
        likes: getThread.likes.length,
        isLikes: islake,
      };

      return {
        message: 'Success to get thread',
        data: data,
      };
    } catch (erorr) {
      throw erorr;
    }
  }

  async getAllThreadById(req: Request, res: Response): Promise<Response> {
    try {
      const user_id: number = res.locals.loginSession.obj.id;
      const thread = await this.threadRepository.find({
        order: { created_at: 'DESC' },
        where: {
          user: {
            id: user_id,
          },
        },
        relations: ['user', 'likes', 'reply'],
        select: {
          user: {
            id: true,
            username: true,
            photo_profile: true,
            fullName: true,
          },
          likes: {
            id: true,
            user: {
              username: true,
            },
          },
          reply: {
            id: true,
            content: true,
          },
        },
      });

      const like = await this.likeRepository.find({
        where: {
          user: {
            id: user_id,
          },
        },
        relations: ['thread', 'user'],
        select: {
          id: true,
          thread: {
            id: true,
          },
        },
      });

      const Threads = thread.map((thread) => {
        let fate = false;

        like.map((items) => {
          if (thread?.id === items?.thread?.id) {
            fate = true;
          }
        });

        return {
          id: thread.id,
          content: thread.content,
          created_at: thread.created_at,
          image_thread: thread.image_thread,
          user: thread.user,
          numberOfReply: thread.reply.length,
          likes: thread.likes.length,
          isLikes: fate,
        };
      });

      return res.status(200).json({
        message: 'success get Thread by user id',
        data: Threads,
      });
    } catch (error) {
      return res.status(500).json({
        massage: 'error to get Thread by user id',
        error: error,
      });
    }
  }

  async deleteThread(thread_id: number, user_id: number) {
    try {
      const thread = await this.threadRepository.findOne({ where: { id: thread_id }, relations: ['user'], select: { user: { id: true } } });

      if (thread.user.id == user_id) {
        await this.threadRepository.delete(thread_id);
        return {
          message: 'Success to delete thread',
        };
      } else {
        return {
          message: 'Failed to delete thread',
        };
      }

      // const deleteThread = await this.threadRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
})();
