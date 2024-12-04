import { Not, Repository } from 'typeorm';
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';

export default new (class FollewerService {
  private readonly UserRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async followUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params;
      const data = parseInt(id.id);
      const user_id = res.locals.loginSession.obj.id;

      const user = await this.UserRepository.findOne({
        where: {
          id: user_id,
        },
        relations: {
          followings: true,
        },
      });

      const userToFollow = await this.UserRepository.findOne({
        where: {
          id: data,
        },
      });

      if (user.id === userToFollow.id) {
        return res.status(400).json({
          message: "can't following my self",
        });
      }

      if (!user || !userToFollow) {
        return res.status(404).json({
          code: 404,
          message: 'User not found',
        });
      }

      const isAlreadyFollowing = user.followings.some(
        (followUser) => followUser.id === data
      );

      if (isAlreadyFollowing) {
        user.followings = user.followings.filter(
          (followUser) => followUser.id !== userToFollow.id
        );
      } else {
        user.followings.push(userToFollow);
      }

      await this.UserRepository.save(user);

      const message = isAlreadyFollowing ? 'Unfollowed' : 'Followed';
      return res.status(200).json({
        code: 200,
        message,
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: 'Internal server error in followUser service',
      });
    }
  }

  async getFollowings(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = res.locals.loginSession.obj.id;
      const user = await this.UserRepository.findOne({
        where: {
          id: user_id,
        },
        relations: {
          followings: true,
        },
      });
      const following = await this.UserRepository.find({
        where: {
          followers: { id: user_id },
        },
      });

      const followings = user.followings.map((item) => {
        let a = false;

        following.map((data) => {
          if (item.id === data.id) {
            a = true;
          }
        });

        return {
          id: item.id,
          username: item.username,
          fullName: item.fullName,
          photo_profile: item.photo_profile,
          isFollow: a,
        };
      });

      if (!user) {
        return res.status(404).json({
          code: 404,
          message: 'User not found',
        });
      }

      return res.status(200).json({
        code: 200,
        data: followings,
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: 'Internal server error in getFollowings service',
      });
    }
  }

  async getFollowers(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = res.locals.loginSession.obj.id;
      const user = await this.UserRepository.findOne({
        where: {
          id: user_id,
        },
        relations: {
          followers: true,
        },
      });

      if (!user) {
        return res.status(404).json({
          code: 404,
          message: 'User not found',
        });
      }

      const followers = await this.UserRepository.find({
        where: {
          followers: { id: user_id },
        },
      });
      const follower = user.followers.map((item) => {
        let a = false;

        followers.map((data) => {
          if (item.id === data.id) {
            a = true;
          }
        });
        return {
          id: item.id,
          username: item.username,
          fullName: item.fullName,
          photo_profile: item.photo_profile,
          isFollow: a,
        };
      });
      return res.status(200).json({
        code: 200,
        data: follower,
      });
    } catch (errror) {
      return res.status(500).json({
        code: 500,
        message: 'Internal server error in getFollowers service',
      });
    }
  }

  async getNotFollowings(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = res.locals.loginSession.obj.id;
      const user = await this.UserRepository.find({
        where: {
          // id:Not(user_id),
          followers: { id: Not(user_id) },
        },
      });

      return res.status(200).json({
        message: 'get Followings Success',
        data: user,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'get user not followings erorr',
      });
    }
  }
})();
