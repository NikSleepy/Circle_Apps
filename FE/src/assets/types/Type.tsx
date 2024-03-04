export interface IThread {
    id:number,
    content:string,
    image_thread:string,
    created_at:string,
    numberOfReply:number,
    likes:number,
    user:{
        id:number,
        username:string,
        fullName:string,
        photo_profile:string

    },
}

export interface initialStateThread {
    thread:IThread[]
}
export interface IThreadById {
   
        id: number,
        content: string,
        created_at: string,
        image_thread: string,
        numberOfReply: number,
        likes: number,
        reply:  {
            id: number;
            content: string;
            created_at: string;
            user: {
                id: number;
                fullName: string;
                username: string;
                photo_profile: string;
            };
        }[],
        user: {
            id: number,
            fullName: string,
            username: string,
            photo_profile: string
        }
    
}

export interface IProfile {
    data : {
        id: number,
        username: string,
        fullName: string,
        password: string,
        email: string,
        description: string,
        photo_cover: string,
        photo_profile: string
    },
    isLoading: boolean,
    isError:boolean

  }

export interface IFollowers {
    id:number
    fullName:string
    username:string
    photo:string
    followers:boolean

  }