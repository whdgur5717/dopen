import { Expose, Transform, plainToInstance } from 'class-transformer';
import type { Comment, Post } from 'shared/openapi/generate';

export class PostModel {
  @Expose() private likes: Post['likes'];
  @Expose() private comments: Post['comments'];
  @Expose() private _id: Post['_id'];
  @Expose() private image: Post['image'];
  @Expose() private imagePublicId: Post['imagePublicId'];
  @Expose() private title: Post['title'];
  @Expose() private channel: Post['channel'];
  @Expose() private author: Post['author'];
  @Expose() private createdAt: Post['createdAt'];
  @Expose() private updatedAt: Post['updatedAt'];

  @Expose()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return JSON.parse(value);
    }
    return value;
  })
  get _title(): {
    title: Post['title'];
    content: string;
  } {
    return JSON.parse(this.title);
  }

  @Expose()
  get _createdAt() {
    return this.createdAt;
  }

  @Expose()
  get _author() {
    return this.author;
  }

  @Expose()
  get _image() {
    return this.image || '';
  }

  @Expose()
  get _comments() {
    return this.comments.map((comment) =>
      plainToInstance(CommentModel, comment),
    );
  }

  @Expose()
  get _likes() {
    return this.likes;
  }
}

export class PostViewModel {
  @Expose()
  @Transform(({ obj }) => obj._title)
  title: PostModel['_title'];

  @Expose()
  @Transform(({ obj }) => obj._author)
  author: PostModel['_author'];

  @Expose()
  @Transform(({ obj }) => obj._createdAt)
  createdAt: PostModel['_createdAt'];

  @Expose()
  @Transform(({ obj }) => {
    return obj._comments.map((comment) =>
      plainToInstance(CommentViewModel, comment),
    );
  })
  comments: CommentViewModel[];

  @Expose()
  @Transform(({ obj }) => obj._likes)
  likes: PostModel['_likes'];

  image: PostModel['_image'];
}

export class PostFormModel {
  title: string;
  content: string;
  image: File | null;

  get defaultValue() {
    return {
      title: this.title || '',
      content: this.content || '',
      image: this.image || null,
    };
  }

  submitFormData({ title, content, image }: PostFormModel, channelId: string) {
    return {
      title: JSON.stringify({ title, content }),
      image,
      channelId,
    };
  }
}

export class CommentModel {
  private _id: Comment['_id'];
  private comment: Comment['comment'];
  private author: Comment['author'];
  private post: Comment['post'];
  private createdAt: Comment['createdAt'];
  private updatedAt: Comment['updatedAt'];

  get _comment() {
    return this.comment;
  }

  get _author() {
    return this.author;
  }

  get _post() {
    return this.post;
  }

  get _createdAt() {
    return this.createdAt;
  }

  get _updatedAt() {
    return this.updatedAt;
  }
}

export class CommentViewModel {
  @Expose()
  @Transform(({ obj }) => obj._author.image)
  image: string;
  comment: string;
  @Expose()
  @Transform(({ obj }) => new Date(obj._createdAt))
  createdAt: Date;

  @Expose()
  @Transform(({ obj }) => obj._author.username)
  author: string;
}

export class CommentFormModel {
  comment: string;
  postId: string;
}
