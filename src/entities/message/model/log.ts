import type { Conversation, Message } from 'shared/openapi/generate';
import { calculateTimeDiff } from 'src/shared/utils/calculateTimeDiff';
import { convertDateToString } from 'src/shared/utils/convertDateToString';

type MessageType = 'sent' | 'received';
export class MessageModel {
  private _id: Message['_id'];
  private message: Message['message'];
  private sender: Message['sender'];
  private receiver: Message['receiver'];
  private seen: Message['seen'];
  private createdAt: Message['createdAt'];
  private updatedAt: Message['updatedAt'];
  type: MessageType;

  constructor(response: Message, currentUserId: string) {
    this._id = response._id;
    this.message = response.message;
    this.sender = response.sender;
    this.receiver = response.receiver;
    this.seen = response.seen;
    this.createdAt = response.createdAt;
    this.updatedAt = response.updatedAt;
    this.type = currentUserId === response._id ? 'sent' : 'received';
  }

  get _createdAt() {
    return convertDateToString(new Date(this.createdAt));
  }

  get _type() {
    return this.type === 'sent' ? this.sender : this.receiver;
  }

  get _format() {
    const { date, time } = this._createdAt;
    return {
      id: this._id,
      message: this.message,
      date,
      time,
      type: this._type,
    };
  }
}

export class ConversationModel {
  private _id: Conversation['_id'];
  private message: Conversation['message'];
  private sender: Conversation['sender'];
  private receiver: Conversation['receiver'];
  private seen: Conversation['seen'];
  private createdAt: Conversation['createdAt'];
  type: 'sent' | 'received';

  constructor(response: Conversation, myId: string) {
    this._id = response._id;
    this.message = response.message;
    this.sender = response.sender;
    this.receiver = response.receiver;
    this.seen = response.seen;
    this.createdAt = response.createdAt;
    this.type = this.getType(myId);
  }

  getType(myId: string): MessageType {
    return this.sender._id === myId ? 'sent' : 'received';
  }

  get _type() {
    return this.type === 'sent' ? this.sender : this.receiver;
  }

  get _format() {
    return {
      key: calculateTimeDiff(this.createdAt),
      userImage: this._type.image,
      username: this._type.username,
      content: this.message,
      date: calculateTimeDiff(this.createdAt) || '',
      userId: this._type._id,
    };
  }
}
