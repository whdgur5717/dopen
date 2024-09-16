import type { MessageModel } from './log';

export class LogModel {
  messageId: string;

  constructor(prop: MessageModel) {
    this.messageId = prop._id;
  }
}
