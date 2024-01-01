import { deleteRequest, getRequest, postRequest, putRequest } from './instance';
import { Like, Post } from './type';

interface Limit {
  offset?: number;
  limit?: number;
}

interface ChannelPayload extends Limit {
  channelId: string;
}

export const getPostListByChannel = async ({
  channelId,
  offset,
  limit,
}: ChannelPayload) =>
  await getRequest<Post[]>(`/posts/channel/${channelId}`, {
    params: { offset, limit },
  });

interface UserPayload extends Limit {
  userId: string;
}

export const getPostListByUser = async ({
  userId,
  offset,
  limit,
}: UserPayload) =>
  await getRequest<Post[]>(`/posts/author/${userId}`, {
    params: { offset, limit },
  });

interface CreatePostPayload {
  title: string;
  image?: BinaryType | null;
  channelId: string;
}

export const createPost = async ({
  title,
  image = null,
  channelId,
}: CreatePostPayload) => {
  await postRequest<Post, CreatePostPayload>('/posts/create', {
    title,
    image,
    channelId,
  });
};

interface EditPostPayload {
  postId: string;
  title: string;
  image?: BinaryType | null;
  imageToDeletePublicId?: string;
  channelId: string;
}
/**사진을 삭제하고 싶을 경우 imageToDeletePublicId에 imagePublicId 넣기*/
export const editPost = async ({
  postId,
  title,
  image,
  imageToDeletePublicId,
  channelId,
}: EditPostPayload) =>
  await putRequest('/posts/update', {
    postId,
    title,
    image,
    imageToDeletePublicId,
    channelId,
  });

export const deletePost = async (id: string) =>
  await deleteRequest('/posts/delete', { id });

export const getPostDetail = async (postId: string) =>
  await getRequest<Post>(`/posts/${postId}`);

export const createLike = async (postId: string) =>
  await postRequest<Like, { postId: string }>('/likes/create', { postId });
/**@id : 특정 Like의 _id값 */
export const deleteLike = async (id: string) => {
  await deleteRequest<Like, { id: string }>('/likes/delete', { id });
};