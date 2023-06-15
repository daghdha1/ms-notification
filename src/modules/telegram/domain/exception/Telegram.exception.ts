import { BaseException } from 'pkg-shared'

export class TelegramException extends BaseException {
  constructor(message: string) {
    super(message)
  }
}
