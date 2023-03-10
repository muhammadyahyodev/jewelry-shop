import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      const fileName: string = uuid.v4() + '.jpg';
      const filePath: string = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new InternalServerErrorException('Faylni yozishda xatolik');
    }
  }
}
