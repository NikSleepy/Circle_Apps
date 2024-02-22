import { NextFunction, Request, Response } from "express"
import multer = require("multer")
import * as path from "path"

export default new class UploadFiles {

    upload(filenames: string) {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'src/img')
            },
            filename: (req, file, cb) => {
                const UnixSuffix = Date.now()
                cb(null, `${filenames}-${UnixSuffix}.png`)
            },
        })
        const uploads = multer({ storage })

        return ( req: Request, res: Response, next: NextFunction ) => {
            uploads.single(filenames)(req, res, (err:any) => {
                console.log(err)
                if (err) {
                    return res.status(500).json({ message: err.message })

                }
                if(req.file){

                    res.locals.filename = req.file.filename
                }
                
                next();
            })
        }
    }

}