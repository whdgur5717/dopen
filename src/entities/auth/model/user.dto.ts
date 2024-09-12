import type { User } from 'shared/openapi/generate';

type ParsedFullName = {
  name: string;
  timerChannelId: string;
};
export class UserDTO {
  _id: User['_id'];
  private fullName: User['fullName'];
  username: User['username'];
  email: User['email'];
  coverImage: User['coverImage'];
  image: User['image'];
  private role: User['role'];
  private isOnline: User['isOnline'];
  posts: User['posts'];
  likes: User['likes'];
  comments: User['comments'];
  followers: User['followers'];
  following: User['following'];
  notifications: User['notifications'];
  messages: User['messages'];
  private createdAt: User['createdAt'];
  private updatedAt: User['updatedAt'];

  get _fullName(): ParsedFullName {
    return safeJSONParse<{
      name: string;
      timerChannelId: string;
    }>(this.fullName);
  }
  set _fullName(params: ParsedFullName) {
    this.fullName = JSON.stringify(params);
  }
}

function safeJSONParse<T = unknown>(text: string): T {
  return JSON.parse(text);
}
