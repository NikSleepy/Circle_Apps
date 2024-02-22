import { v2 as cloudinary } from "cloudinary";

export default new class CloudinaryConfig {
    
    config() {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_CLOUD,
            api_secret: process.env.SECRET_CLOUD

        })
    }

    async destination( image: string ) {
        try {
            const cloudiResponse = await cloudinary.uploader.upload('src/img/' + image, {
                folder: 'circle_apps'
            })
            return cloudiResponse.secure_url
        } catch (error) {
            throw error
            // console.log(error)
        }
    }
}
