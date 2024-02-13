import * as joi from "joi"

export const registerSchema = joi.object({
    username: joi.string().required(),
    fullName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(8)
})

export const loginSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().required().min(8)
})




/// .Allow(null) untuk mengizinkan null/ boleh kosong 
// dan jngn lupa di entity nya di kasih @Column({ nullable: true })