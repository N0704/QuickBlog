import fs from "fs";
import { imagekit } from "../configs/ImageKit";

export const uploadImage = async (imageFile : Express.Multer.File) : Promise<string> => {
    const fileBuffer = fs.readFileSync(imageFile.path);
    const uploadResponse = await imagekit.upload({
        file: fileBuffer,
        fileName: imageFile.originalname,
        folder: "/blogs",
    })

    return imagekit.url({
        path: uploadResponse.filePath,
        transformation: [{quality: "auto", format: "webp", width: 1280}]
    })
}