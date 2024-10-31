import multer from "multer";
import { Request } from "express";
import { ROOT_DIRECTORY } from "../config";

const storage = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, destination: string) => void
    ) => {
        const filename = `${Math.random()}-${file.originalname}`
        callback(null, filename)
    }
})

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
) => {
    const allowedFile = /png|jpg|jpeg|gif/

   const isAllow = allowedFile.test(file.mimetype)
   if (isAllow) {
       callback(null, true)
   }else {
       callback(new Error("File Error"))
   }
}

const uploadBakeryPhoto = multer({
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})