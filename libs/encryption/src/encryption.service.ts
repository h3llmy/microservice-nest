import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  encrypt(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  match(password: string, encrypt: string): boolean {
    return bcrypt.compareSync(password, encrypt);
  }
}
