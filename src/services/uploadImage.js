import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadImage = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const image = req.files.image;

    if (!/^image/.test(image.mimetype)) {
        return res.status(400).send('Uploaded file is not an image.');
    }

    const uploadPath = path.join(path.join(__dirname, '..', 'upload', image.name));

    image.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send({ success: true, message: 'File uploaded successfully!', data: `uploads/${image.name}` });
    });
};
