import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

type Props_file = {
    id: string | undefined,
    url: string | undefined
}

export async function File_transformer(file: File): Promise<Props_file> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const response: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, (err, result) => {
            if (err) reject(err);
            resolve(result);
        }).end(buffer);
    });

    return {
        id: response?.public_id,
        url: response?.secure_url
    }
}

export async function File_delete(id: string): Promise<boolean> {
    const result: UploadApiResponse = await cloudinary.uploader.destroy(id);
    return (result.deleted?.image?.[id]) ? true : false;
}