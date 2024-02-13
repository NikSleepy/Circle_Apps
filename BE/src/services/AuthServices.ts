import { Repository } from "typeorm"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
// class untuk cetakan seuah fungsi
// private agar tidak di baca di class lain
// redonly agar tidak di ubah/ di masukin nilai lagi



export default new class AuthService {
    private readonly AuthRepository: Repository<User> = AppDataSource.getRepository(User)
    async register ( reqBody: any ): Promise<Object | string> {
        try {
            const checkUsername = await this.AuthRepository.count({ where: { username: reqBody.username }})
            if (checkUsername > 0) {
                return `Username ${reqBody.username} already exist`
            }

            const hashedPassword = await bcrypt.hash(reqBody.password, 10)
            const obj = this.AuthRepository.create({
                username: reqBody.username,
                fullName: reqBody.fullName,
                email: reqBody.email,
                password: hashedPassword
            })

            const resRegist = await this.AuthRepository.save(obj)

            return {
                message: "Registration Success",
                data: resRegist
            }
        } catch (error) {
            throw error;
        }
    }



    async login ( reqBody: any ): Promise<Object | string> {
        
            const checkUsername = await this.AuthRepository.findOne({ where: { username: reqBody.username }})
            if ( !checkUsername ) {
                throw new Error ( `Username ${reqBody.username} not found` ) 
            }

            const comparePassword = await  bcrypt.compare(reqBody.password, checkUsername.password)
            if ( !comparePassword ) {
                throw new Error ( `Password not match` )
            }

            const obj = this.AuthRepository.create({
                id: checkUsername.id,
                username: checkUsername.username,
                fullName: checkUsername.fullName,
                email: checkUsername.email
            })

            const token = jwt.sign({ obj }, 'SECRET_KEY', { expiresIn: '8h' })

            return {
                message: "Login Success dari services",
                token: token,
                user: obj.id
            }
        } 
    
}