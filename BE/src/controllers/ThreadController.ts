import { Request, Response } from 'express';
import ThreadService from '../services/ThreadService';
import CloudinaryConfig from '../libs/Cloudinary';
import { log } from 'console';

export default new (class ThreadController {
  async createThread(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    data.user = res.locals.loginSession.obj.id;

    try {
      const img = null;
      data.image_thread = res.locals.filename;

      if (data.image_thread) {
        const cloudinary = await CloudinaryConfig.destination(
          data.image_thread
        );
        data.image_thread = cloudinary;
      }

      const response = await ThreadService.createThread(data);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  getThreads(req: Request, res: Response) {
    ThreadService.getAllThread(req, res);
  }

  async getThreadById(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = res.locals.loginSession.obj.id;
      const id = parseInt(req.params.id);
      const response = await ThreadService.getThreadById(id, user_id);
      return res.status(200).json(response);
    } catch (erorr) {
      throw erorr;
    }
  }

  async getAllThreadById(req: Request, res: Response) {
    ThreadService.getAllThreadById(req, res);
  }

  async deleteThread(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const response = await ThreadService.deleteThread(id);
      return res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }
})();
