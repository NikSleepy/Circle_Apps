export interface IThread {
    id:number,
    content:string,
    image_thread:string,
    created_at:string,
    numberOfReply:number,
    user:{
        id:number,
        username:string,
        fullName:string,
        photo_profile:string

    },
}