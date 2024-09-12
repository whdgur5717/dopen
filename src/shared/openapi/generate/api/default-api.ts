/* eslint-disable @typescript-eslint/ban-types */

/* eslint-disable no-empty-pattern */

/* tslint:disable /
/ eslint-disable */
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from 'shared/axios/instance';

import { Channel } from '../model';
import { Comment } from '../model';
import { Conversation } from '../model';
import { CreateCommentRequest } from '../model';
import { CreateNotificationRequest } from '../model';
import { Follow } from '../model';
import { FollowUserRequest } from '../model';
import { Like } from '../model';
import { LikePostRequest } from '../model';
import { Login200Response } from '../model';
import { LoginRequest } from '../model';
import { Message } from '../model';
import { Notification } from '../model';
import { Post } from '../model';
import { PutMessageSeenRequest } from '../model';
import { SearchPostAndUser200ResponseInner } from '../model';
import { SendMessageRequest } from '../model';
import { SignupRequest } from '../model';
import { UpdateUserInfoRequest } from '../model';
import { UpdateUserPasswordRequest } from '../model';
import { User } from '../model';

const checkUserAuthentication = ({}: {} = {}): Promise<User> =>
  getRequest('/auth-user', {});

const createComment = ({
  createCommentRequest,
}: {
  createCommentRequest: CreateCommentRequest;
}): Promise<Comment> =>
  postRequest('/comments/create', {
    createCommentRequest,
  });

const createNotification = ({
  createNotificationRequest,
}: {
  createNotificationRequest: CreateNotificationRequest;
}): Promise<Notification> =>
  postRequest('/notifications/create', {
    createNotificationRequest,
  });

const createPost = ({
  title,
  image,
  channelId,
}: {
  title: string;
  image: File | null;
  channelId: string;
}): Promise<Post> =>
  postRequest('/posts/create', {
    title,
    image,
    channelId,
  });

const deleteComment = ({ id }: { id: string }): Promise<Comment> =>
  deleteRequest('/comments/delete', {
    id,
  });

const deleteLikePost = ({ id }: { id: string }): Promise<Like> =>
  deleteRequest('/likes/delete', {
    id,
  });

const deletePost = ({ id }: { id: string }): Promise<void> =>
  deleteRequest('/posts/delete', {
    id,
  });

const followUser = ({
  followUserRequest,
}: {
  followUserRequest: FollowUserRequest;
}): Promise<Follow> =>
  postRequest('/follow/create', {
    followUserRequest,
  });

const getChannelInfo = ({
  channelName,
}: {
  channelName: string;
}): Promise<Channel> =>
  getRequest('/channel/{channelName}', {
    channelName,
  });

const getChannelList = ({}: {} = {}): Promise<Array<Channel>> =>
  getRequest('/channels', {});

const getMessageList = ({}: {} = {}): Promise<Array<Conversation>> =>
  getRequest('/messages/conversations', {});

const getMessageListByUser = ({
  userId,
}: {
  userId: string;
}): Promise<Array<Message>> =>
  getRequest('/messages', {
    userId,
  });

const getNotification = ({}: {} = {}): Promise<Array<Notification>> =>
  getRequest('/notifications', {});

const getOnlineUserList = ({}: {} = {}): Promise<Array<User>> =>
  getRequest('/users/online-users', {});

const getPostByPostId = ({ postId }: { postId: string }): Promise<Post> =>
  getRequest('/posts/{postId}', {
    postId,
  });

const getPostListByChannel = ({
  channelId,
  offset,
  limit,
}: {
  channelId: string;
  offset?: number;
  limit?: number;
}): Promise<Array<Post>> =>
  getRequest('/posts/channel/{channelId}', {
    channelId,
    offset,
    limit,
  });

const getPostListByUser = ({
  authorId,
  offset,
  limit,
}: {
  authorId: string;
  offset?: number;
  limit?: number;
}): Promise<Array<Post>> =>
  getRequest('/posts/author/{authorId}', {
    authorId,
    offset,
    limit,
  });

const getUserInfo = ({ userId }: { userId: string }): Promise<User> =>
  getRequest('/users/{userId}', {
    userId,
  });

const getUserList = ({
  offset,
  limit,
}: {
  offset?: number;
  limit?: number;
}): Promise<Array<User>> =>
  getRequest('/users/get-users', {
    offset,
    limit,
  });

const likePost = ({
  likePostRequest,
}: {
  likePostRequest: LikePostRequest;
}): Promise<Like> =>
  postRequest('/likes/create', {
    likePostRequest,
  });

const login = ({
  loginRequest,
}: {
  loginRequest: LoginRequest;
}): Promise<Login200Response> =>
  postRequest('/login', {
    loginRequest,
  });

const logout = ({}: {} = {}): Promise<void> => postRequest('/logout', {});

const postUserProfileImg = ({
  isCover,
  image,
}: {
  isCover?: boolean;
  image?: File;
}): Promise<User> =>
  postRequest('/users/upload-photo', {
    isCover,
    image,
  });

const putMessageSeen = ({
  putMessageSeenRequest,
}: {
  putMessageSeenRequest: PutMessageSeenRequest;
}): Promise<void> =>
  putRequest('/messages/update-seen', {
    putMessageSeenRequest,
  });

const putNotificationSeen = ({}: {} = {}): Promise<void> =>
  putRequest('/notifications/seen', {});

const searchPostAndUser = ({
  query,
}: {
  query: string;
}): Promise<Array<SearchPostAndUser200ResponseInner>> =>
  getRequest('/search/all/{query}', {
    query,
  });

const searchUser = ({ query }: { query: string }): Promise<Array<User>> =>
  getRequest('/search/users/{query}', {
    query,
  });

const sendMessage = ({
  sendMessageRequest,
}: {
  sendMessageRequest: SendMessageRequest;
}): Promise<Message> =>
  postRequest('/messages/create', {
    sendMessageRequest,
  });

const signup = ({
  signupRequest,
}: {
  signupRequest: SignupRequest;
}): Promise<Login200Response> =>
  postRequest('/signup', {
    signupRequest,
  });

const unfollowUser = ({ id }: { id: string }): Promise<Follow> =>
  deleteRequest('/follow/delete', {
    id,
  });

const updatePost = ({
  postId,
  title,
  image,
  imageToDeletePublicId,
  channelId,
}: {
  postId?: string;
  title?: string;
  image?: File;
  imageToDeletePublicId?: string;
  channelId?: string;
}): Promise<Post> =>
  putRequest('/posts/update', {
    postId,
    title,
    image,
    imageToDeletePublicId,
    channelId,
  });

const updateUserInfo = ({
  updateUserInfoRequest,
}: {
  updateUserInfoRequest: UpdateUserInfoRequest;
}): Promise<User> =>
  putRequest('/settings/update-user', {
    updateUserInfoRequest,
  });

const updateUserPassword = ({
  updateUserPasswordRequest,
}: {
  updateUserPasswordRequest: UpdateUserPasswordRequest;
}): Promise<void> =>
  putRequest('/settings/update-password', {
    updateUserPasswordRequest,
  });

export {
  checkUserAuthentication,
  createComment,
  createNotification,
  createPost,
  deleteComment,
  deleteLikePost,
  deletePost,
  followUser,
  getChannelInfo,
  getChannelList,
  getMessageList,
  getMessageListByUser,
  getNotification,
  getOnlineUserList,
  getPostByPostId,
  getPostListByChannel,
  getPostListByUser,
  getUserInfo,
  getUserList,
  likePost,
  login,
  logout,
  postUserProfileImg,
  putMessageSeen,
  putNotificationSeen,
  searchPostAndUser,
  searchUser,
  sendMessage,
  signup,
  unfollowUser,
  updatePost,
  updateUserInfo,
  updateUserPassword,
};
