import {
  CreateNotificationRequestNotificationTypeEnum,
  type Notification,
} from 'shared/openapi/generate';

export class NotificationModel {
  private seen: Notification['seen'];
  private _id: Notification['_id'];
  private author: Notification['author'];
  private user: Notification['user'];
  private post: Notification['post'];
  private follow: Notification['follow'];
  private comment: Notification['comment'];
  private message: Notification['message'];
  private createdAt: Notification['createdAt'];
  private updatedAt: Notification['updatedAt'];

  constructor(response: Notification) {
    this.seen = response.seen;
    this._id = response._id;
    this.author = response.author;
    this.user = response.user;
    this.post = response.post;
    this.follow = response.follow;
    this.comment = response.comment;
    this.message = response.message;
    this.createdAt = response.createdAt;
    this.updatedAt = response.updatedAt;
  }

  get _format() {
    return {
      type: this._type,
      author: this.author,
      date: this.createdAt,
      seen: this.seen,
    };
  }

  get _type() {
    if (this.message) {
      return CreateNotificationRequestNotificationTypeEnum['MESSAGE'];
    }
    if (this.comment) {
      return CreateNotificationRequestNotificationTypeEnum['COMMENT'];
    }
    if (this.follow) {
      return CreateNotificationRequestNotificationTypeEnum['FOLLOW'];
    } else {
      return CreateNotificationRequestNotificationTypeEnum['LIKE'];
    }
  }
}

// export const useNotificationList = () => {
//   const { data } = useSuspenseQuery<
//     Notification[],
//     AxiosError,
//     MyNotificationListItem[]
//   >({
//     queryKey: [NOTIFICATION_LIST],
//     queryFn: getUserNotificationList,
//     refetchOnWindowFocus: true,

//     select: (data) => {
//       return data.map<MyNotificationListItem>((notify) => {
//         const { createdAt: date, _id, author, seen } = notify;
//         if (notify.message) {
//           return { type: 'MESSAGE', author, date, _id, seen };
//         }

//         if (notify.comment) {
//           return { type: 'COMMENT', author, date, _id, seen };
//         }

//         if (notify.follow) {
//           return { type: 'FOLLOW', author, date, _id, seen };
//         }

//         if (notify.like) {
//           return { type: 'LIKE', author, date, _id, seen };
//         }

//         return { type: 'MESSAGE', author, date, _id, seen };
//       });
//     },
//   });

//   return { myNotificationList: data ?? [] };
// };
