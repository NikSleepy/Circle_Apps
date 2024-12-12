import { Equal, Not, Repository } from 'typeorm';
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { it } from 'node:test';
import { Thread } from '../entity/Thread';
import { Like } from '../entity/Like';
import { number } from 'joi';

export default new (class UserService {
  private readonly UserRepository: Repository<User> =
    AppDataSource.getRepository(User);
    private readonly likeRepository: Repository<Like> =
    AppDataSource.getRepository(Like);

  async getUserAll(req: Request, res: Response) {
    try {
      const user_id = res.locals.loginSession.obj.id;
      const getuser = await this.UserRepository.find({
        where: {
          id: Not(user_id),
        },
        relations: {
          followers: true,
        },
        select: {
          id: true,
          username: true,
          fullName: true,
          photo_profile: true,
          followings: {
            id: true,
          },
        },
      });

      const following = await this.UserRepository.find({
        where: {
          id: Not(user_id),
          followers: {
            id: user_id,
          },
        },
        select: {
          id: true,
          username: true,
          fullName: true,
          photo_profile: true,
        },
      });

      const mapping = getuser.map((item) => {
        let a = false;

        following.map((data) => {
          if (item.id === data.id) {
            a = true;
          }
        });
        // if(following)
        return {
          id: item.id,
          username: item.username,
          fullName: item.fullName,
          photo_profile: item.photo_profile,
          isFollow: a,
        };
      });
      return res.status(200).json({
        message: 'Success to get users',
        data: mapping,
      });
    } catch (error) {
      return res.status(400).json({
        message: `error in getUser ${error}`,
      });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const user_id = res.locals.loginSession.obj.id;
      const getuser = await this.UserRepository.find({
        where: {
          id: Not(user_id),
        },
        relations: {
          followers: true,
        },
        select: {
          id: true,
          username: true,
          fullName: true,
          photo_profile: true,
          followings: {
            id: true,
          },
        },
      });

      const following = await this.UserRepository.find({
        where: {
          id: Not(user_id),
          followers: {
            id: user_id,
          },
        },
        select: {
          id: true,
          username: true,
          fullName: true,
          photo_profile: true,
        },
      });

      const mapping = getuser.map((item) => {
        let follow = false;

        following.map((data) => {
          if (item.id === data.id) {
            follow = true;
          }
        });

        return {
          id: item.id,
          username: item.username,
          fullName: item.fullName,
          photo_profile: item.photo_profile,
          isFollow: follow,
        };
      });

      const userFilter = mapping.filter((items) => items.isFollow === false);

      return res.status(200).json({
        message: 'Success to get users',
        data: userFilter,
      });
    } catch (error) {
      return res.status(400).json({
        message: `error in getUser ${error}`,
      });
    }
  }

  async getUserById(id: any) {
    try {
      const getuser = await this.UserRepository.createQueryBuilder('user')
        .where(id)
        .getOneOrFail();
      return {
        message: 'Success to get user',
        data: getuser,
      };
    } catch (error) {
      throw error;
    }
  }

  async getUserByThread(id: any, user_login: any) {
    try {
      // const getuser = await this.UserRepository.createQueryBuilder('user').where(username).getOneOrFail();
      const getuser = await this.UserRepository.findOne({
        where: {
          id: id.user_id,
        },
        relations: ['followings', 'followers', 'threads.reply', 'threads.likes', 'reply', 'threads.user'],
      })

      const like = await this.likeRepository.find({
        where: {
          user: {
            id: user_login,
          },
          
        },
        relations: ['thread'],
      })
      const dataThreads = getuser.threads.map((item) => {
        let islike = false;
        like.forEach((items) => {
          
          if (items.thread.id == item.id) {
            // console.log(items.thread.id, user_login)
            islike = true;
          }
        })

        return {
          id: item.id,
          content: item.content,
          image_thread: item.image_thread,
          created_at: item.created_at,
          numberOfReply: item.reply.length,
          Likes: item.likes.length,
          isLike: islike,
          user: {
            id: item.user.id,
            username: item.user.username,
            fullName: item.user.fullName,
            photo_profile: item.user.photo_profile,
          }
        }
      })
      
      const sortedThreads = dataThreads.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      let isFollow = false;

      getuser.followers.forEach((item) => {
        if (item.id == user_login) {
          isFollow = true;
        }
      })
      

      const data = {
        user: {
          id: getuser.id,
          username: getuser.username,
          fullName: getuser.fullName,
          photo_profile: getuser.photo_profile,
          followings: getuser.followings.length,
          followers: getuser.followers.length,
          photo_cover: getuser.photo_cover,
          description: getuser.description,
          isFollow: isFollow
        },
        threads: sortedThreads,
        followings: getuser.followings,
        followers: getuser.followers
      }
      return {
        message: 'Success to get user',
        data: data,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateUser(data: object, id: string) {
    try {
      const id_string = { id: id };
      const updateUser = await this.UserRepository.createQueryBuilder()
        .update(User)
        .set(data)
        .where(id_string)
        .execute();
      return {
        message: 'Success to update user',
        data: updateUser,
      };
    } catch (error) {
      return {
        message: 'error',
        error: error,
      };
    }
  }

  async userLogin(req: Request, res: Response): Promise<Response> {
    const id = res.locals.loginSession.obj.id;
    const user = await this.UserRepository.find({
      where: {
        id: id,
      },
      relations: ['followings', 'followers'],
      select: {
        id: true,
        username: true,
        fullName: true,
        photo_cover: true,
        photo_profile: true,
        email: true,
        description: true,
        followers: true,
        followings: true,
      },
    });

    const data = user.map((items) => {
      return {
        id: items.id,
        username: items.username,
        fullName: items.fullName,
        email: items.email,
        photo_cover: items.photo_cover,
        photo_profile: items.photo_profile,
        description: items.description,
        followers: items.followers.length,
        followings: items.followings.length,
      };
    });
    return res.status(200).json(data);
  }

  async deleteUser(id: any) {
    try {
      const deleteUser = await this.UserRepository.createQueryBuilder()
        .delete()
        .from(User)
        .where(id)
        .execute();
      return {
        message: 'Success to delete user',
        data: deleteUser,
      };
    } catch (error) {
      throw error;
    }
  }
})();
