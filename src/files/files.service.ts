import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
    async createFile(file): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg';
            const baseDir = path.resolve(__dirname, '..', '..', 'src', 'static');
            if (!fs.existsSync(baseDir)) {
                fs.mkdirSync(baseDir, { recursive: true });
            }

            const filePath = path.join(baseDir, fileName);
            fs.writeFileSync(filePath, file.buffer);
            return fileName;
        } catch (error) {
            console.error('Error creating file:', error);
            throw new HttpException('Error with saving file', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteFile(fileName: string): Promise<void> {
        try {
            const filePath = path.join(__dirname, '..', '..', 'src', 'static', fileName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (error) {
            console.error('Error deleting file:', error);
            throw new HttpException('Error deleting file', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
