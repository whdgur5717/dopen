import type { User } from 'shared/openapi/generate';

type ParsedFullName = {
  name: string;
  timerChannelId: string;
};

function safeJSONParse<T>(str: string) {
  return JSON.parse(str) as T;
}

export class UserModel {
  private _id: User['_id'];
  private fullName: User['fullName'];
  private username: User['username'];
  private email: User['email'];
  private coverImage: User['coverImage'];
  private image: User['image'];
  private role: User['role'];
  private isOnline: User['isOnline'];
  private posts: User['posts'];
  private likes: User['likes'];
  private comments: User['comments'];
  private followers: User['followers'];
  private following: User['following'];
  private notifications: User['notifications'];
  private messages: User['messages'];
  private createdAt: User['createdAt'];
  private updatedAt: User['updatedAt'];

  get _fullName() {
    return safeJSONParse<{
      name: string;
      timerChannelId: string;
    }>(this.fullName);
  }

  get _username(): User['username'] {
    return this.username;
  }

  get _email(): User['email'] {
    return this.email;
  }

  get _coverImage(): User['coverImage'] {
    return this.coverImage;
  }

  get _image(): User['image'] {
    return this.image;
  }

  get _role(): User['role'] {
    return this.role;
  }

  get _isOnline(): User['isOnline'] {
    return this.isOnline;
  }

  get _posts(): User['posts'] {
    return this.posts;
  }

  get _likes(): User['likes'] {
    return this.likes;
  }

  get _comments(): User['comments'] {
    return this.comments;
  }

  get _followers(): User['followers'] {
    return this.followers;
  }

  get _following(): User['following'] {
    return this.following;
  }

  get _notifications(): User['notifications'] {
    return this.notifications;
  }

  get _messages(): User['messages'] {
    return this.messages;
  }

  get _createdAt(): User['createdAt'] {
    return this.createdAt;
  }

  get _updatedAt(): User['updatedAt'] {
    return this.updatedAt;
  }
}
