import { diskStorage } from 'multer';
import { extname } from 'path';

export const storage = diskStorage({
  destination: './src/public/image/products',
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

function generateFilename(file) {
  return `${Date.now()}${extname(file.originalname)}`;
}
