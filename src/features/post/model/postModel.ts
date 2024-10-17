import { Expose, Transform, plainToInstance } from 'class-transformer';
import { UserModel } from 'entities/auth/model/user.dto';
import type { Comment, Post } from 'shared/openapi/generate';

export class PostModel {
  @Expose() private likes: Post['likes'];
  @Expose()
  @Transform(({ obj }: { obj: Post }) =>
    obj.comments.map((comment) => plainToInstance(CommentModel, comment)),
  )
  private comments: Post['comments'];
  @Expose() private _id: Post['_id'];
  @Expose() private image: Post['image'];
  @Expose() private imagePublicId: Post['imagePublicId'];
  @Expose() private title: Post['title'];
  @Expose() private channel: Post['channel'];
  @Expose() private author: Post['author'];
  @Expose() private createdAt: Post['createdAt'];
  @Expose() private updatedAt: Post['updatedAt'];

  @Expose()
  get _title() {
    if (typeof this.title === 'string') {
      return JSON.parse(this.title);
    }
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

  get _comments() {
    return this.comments;
  }

  @Expose()
  get _likes() {
    return this.likes;
  }
}

export class PostViewModel {
  @Expose()
  @Transform(({ obj }: { obj: PostModel }) => obj._title)
  title: { title: string; content: string };
  @Expose()
  @Transform(({ obj }: { obj: PostModel }) =>
    plainToInstance(UserModel, obj._author),
  )
  author: UserModel;

  @Expose()
  @Transform(({ obj }) => obj._createdAt)
  createdAt: PostModel['_createdAt'];

  @Expose()
  @Transform(({ obj }: { obj: PostModel }) => {
    return obj._comments.map((comment) => {
      return plainToInstance(CommentViewModel, comment);
    });
  })
  comments: CommentViewModel[];

  likes: PostModel['_likes'];

  image: PostModel['_image'];
}

export class PostFormModel {
  title: string;
  content: string;
  image: File | null;
}

export class ReflectionPostViewModel {
  @Expose()
  @Transform(({ obj }: { obj: PostModel }) => JSON.parse(obj._title))
  title: {
    title: string;
    content: {
      favorite: string;
      shame: string;
      sayToMe: string;
    };
  };
  author: PostModel['_author'];

  @Expose()
  @Transform(({ obj }: { obj: PostModel }) => new Date(obj._createdAt))
  createdAt: Date;

  @Expose()
  @Transform(({ obj }: { obj: PostModel }) => {
    return obj._comments?.map((comment) => {
      return plainToInstance(CommentViewModel, comment);
    });
  })
  comments: CommentViewModel[];

  likes: PostModel['_likes'];

  image: PostModel['_image'];
}

export class ReflectionFormModel {
  @Expose()
  @Transform(({ obj }) => obj.title.title)
  title: ReflectionPostViewModel['title']['title'];
  @Expose()
  @Transform(({ obj }) => obj.title.content.favorite)
  favorite: ReflectionPostViewModel['title']['content']['favorite'];
  @Expose()
  @Transform(({ obj }) => obj.title.content.shame)
  shame: ReflectionPostViewModel['title']['content']['shame'];
  @Expose()
  @Transform(({ obj }) => obj.title.content.sayToMe)
  sayToMe: ReflectionPostViewModel['title']['content']['sayToMe'];
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
  @Transform(({ obj }) => {
    return obj._author.username;
  })
  author: string;
}

export class CommentFormModel {
  comment: string;
  postId: string;
}
