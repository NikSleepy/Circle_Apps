import { Repository } from 'typeorm';
import { Reply } from '../entity/Reply';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';

export default new (class ReplyService {
  private readonly replyRepository: Repository<Reply> =
    AppDataSource.getRepository(Reply);

  async createReply(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const reply = await this.replyRepository.create({
        thread: data.thread,
        user: res.locals.loginSession.obj.id,
        content: data.content,
        file_reply: data.file_reply,
        created_at: data.created_at,
      });

      const result = await this.replyRepository.save(reply);

      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Something went wrong in service', error });
    }
  }

  async getAllReply(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.replyRepository.find({
        order: { created_at: 'DESC' },
        relations: { user: true, thread: true },
        select: {
          user: {
            id: true,
            username: true,
            fullName: true,
            photo_profile: true,
          },
          thread: {
            id: true,
          },
        },
      });
      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Something went wrong in service', error });
    }
  }

  async deleteReply(req: Request, res: Response): Promise<Response> {
    const result = await this.replyRepository.delete(req.params.id);
    return res.status(200).json(result);
  }
})();
