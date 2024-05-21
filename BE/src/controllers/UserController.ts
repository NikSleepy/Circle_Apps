import { Request, Response } from 'express';
import UserServices from '../services/UserServices';
import { updateUserSchema } from '../utils/validator/UserValidator';
import Cloudinary from '../libs/Cloudinary';

export default new (class UserController {
  async getUserAll(req: Request, res: Response) {
    UserServices.getUserAll(req, res);
  }

  async getUsers(req: Request, res: Response) {
    UserServices.getUsers(req, res);
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params;
      const response = await UserServices.getUserById(id);
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    const id = res.locals.loginSession.obj.id;
    const data = req.body;
    try {
      data.photo_profile = res.locals.filename;

      if (data.photo_profile) {
        try {
          const cloudinary = await await Cloudinary.destination(
            data.photo_profile
          );
          data.photo_profile = cloudinary;
        } catch (error) {
          return res.status(500).json({
            message: 'error upload clodinary',
          });
        }
      }

      // data.photo_profile = img
      const response = await UserServices.updateUser(data, id);
      return res.status(200).json(response);
    } catch (error) {
      throw res.status(500).json({
        message: 'error update user',
        error: error,
      });
    }
  }

  userLogin(req: Request, res: Response) {
    UserServices.userLogin(req, res);
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params;
      const response = await UserServices.deleteUser(id);
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }
})();
