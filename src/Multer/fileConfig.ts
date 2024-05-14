import multer, { diskStorage } from 'multer';
import { RequestHandler } from 'express';
import { Request } from 'express';

const storage = diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, "./images");
  },
  filename: (req: Request, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload: RequestHandler = multer({
  storage,
}).single('file');

export { upload };