import * as joi from "joi"

export const createThreadSchema = joi.object({
    content: joi.string().allow(null),
    imgae_thread: joi.string().allow(null)
})