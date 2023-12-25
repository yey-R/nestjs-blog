import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { join } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';

export const multerConfig = {
    dest: join(__dirname, '..', '..', '/uploads/'),
};

export const multerOptions = {
    fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            // Allow storage of file
            cb(null, true);
        } else {
            // Reject file
            cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
    },

    storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
            const uploadPath = multerConfig.dest;

            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath);
            }
            cb(null, uploadPath);
        },

        filename: (req: any, file: any, cb: any) => {
            let fileName = `${uuid()}${extname(file.originalname)}`;
            
            while (existsSync(join(multerConfig.dest, fileName))) {
                fileName = `${uuid()}${extname(file.originalname)}`;
            }

            cb(null, fileName);
        },
    }),
};