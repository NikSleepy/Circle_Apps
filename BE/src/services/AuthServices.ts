import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
// import * as dotenv from "dotenv"
import { Request } from 'express-serve-static-core';
import { Response } from 'express';
import { loginSchema } from '../utils/validator/AuthValidator';
// class untuk cetakan seuah fungsi
// private agar tidak di baca di class lain
// redonly agar tidak di ubah/ di masukin nilai lagi

export default new (class AuthService {
  private readonly AuthRepository: Repository<User> =
    AppDataSource.getRepository(User);
  async register(reqBody: any): Promise<Object | string> {
    try {
      const checkUsername = await this.AuthRepository.count({
        where: { username: reqBody.username },
      });
      if (checkUsername > 0) {
        return {
          status: 400,
          message: `Username ${reqBody.username} already exist`,

        }
      }

      const checkEmail = await this.AuthRepository.count({
        where: { email: reqBody.email },
      });
      if (checkEmail > 0) {
        return {
          status: 400,
          message: `Email ${reqBody.email} already exist`,
        }
      }

      const hashedPassword = await bcrypt.hash(reqBody.password, 10);

      const obj = this.AuthRepository.create({
        username: reqBody.username,
        fullName: reqBody.fullName,
        email: reqBody.email,
        password: hashedPassword,
        photo_profile: reqBody.photo_profile,
        photo_cover: reqBody.photo_cover,
        description: reqBody.description,
      });

      const resRegist = await this.AuthRepository.save(obj);

      return {
        message: 'Registration Success',
        data: resRegist,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const { error, value } = loginSchema.validate(data);
      const checkUsername = await this.AuthRepository.findOne({
        where: { username: value.username },
      });

      //chacking username
      if (!checkUsername) {
        return res.status(404).json({
          error: `Username not found`,
        });
      }
      
      const comparePassword = await bcrypt.compare(
        value.password,
        checkUsername.password
      );

      if (!comparePassword) {
        return res.status(400).json({
          error: `Invalid Password`,
        });
      }

      const obj = this.AuthRepository.create({
        id: checkUsername.id,
        username: checkUsername.username,
        fullName: checkUsername.fullName,
        email: checkUsername.email,
      });

      const token = jwt.sign({ obj }, process.env.SECRET_KEY, {
        expiresIn: '1d',
      });

      return res.status(200).json({
        message: 'Login Success dari services',
        token: token,
        user: obj.id,
      });
    } catch (erorr) {
      return res.status(400).json({
        messege: erorr,
      });
    }
  }
})();
