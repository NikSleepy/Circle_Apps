import * as joi from "joi"

export const updateUserSchema = joi.object({
    username: joi.string().required(),
    fullName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(8)
})