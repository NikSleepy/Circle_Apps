import { Request, Response } from 'express';
import FollowerServices from '../services/FollowerServices';

export default new (class FollowController {
  followUser(req: Request, res: Response) {
    FollowerServices.followUser(req, res);
  }

  getFollowings(req: Request, res: Response) {
    FollowerServices.getFollowings(req, res);
  }

  getFollowers(req: Request, res: Response) {
    FollowerServices.getFollowers(req, res);
  }

  getNotFollowings(req: Request, res: Response) {
    FollowerServices.getNotFollowings(req, res);
  }

  // getAllFollowers( req: Request, res: Response ) {
  //     FollowerServices.getAllFollowers(req, res)
  // }
})();
