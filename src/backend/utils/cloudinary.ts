import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function File_transformer(file: File) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const response: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, (err, result) => {
            if (err) reject(err);
            resolve(result);
        }).end(buffer);
    });

    return {
        id: response.public_id,
        url: response.secure_url
    }
}

export async function File_delete(id: string) {
    const result = await cloudinary.uploader.destroy(id);
    return result;
}