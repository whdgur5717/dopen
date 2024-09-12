import { queryOptions } from '@tanstack/react-query';
import { getChannelList } from 'shared/openapi';

export const channelQueries = {
  keys: {
    list: ['channel_list'] as const,
    channelInfo: (channel: string) =>
      [channelQueries.keys.list, channel] as const,
  },
  /**
   *
   * @returns 전체 채널 리스트 중 게시글 업로드하는 채널만 필터링
   */
  channelList() {
    return queryOptions({
      queryKey: [...channelQueries.keys.list],
      queryFn: getChannelList,
      select: (data) =>
        data.filter(
          (channel) =>
            channel.description === '자유 게시판' ||
            channel.description === '인증 & 회고 게시판' ||
            channel.description === '정보 공유 게시판',
        ),
    });
  },

  channelInfo(channelName: string) {
    return queryOptions({
      ...channelQueries.channelList(),
      select: (data) =>
        data.filter((channel) => channel.name === channelName)[0],
    });
  },
};
//왜 채널명 찾는 API 안쓰고 이걸로 찾는거지?

// export const useChannelList = () => {
//   const { data, isError, isLoading } = useQuery<Channel[], AxiosError>({
//     queryKey: [CHANNEL_LIST],
//     queryFn: getChannelList,

//     meta: {
//       errorMessage: '채널 목록을 가져올 때 에러가 발생했습니다.',
//     },
//     select: (data) =>
//       data.filter(
//         (channel) =>
//           channel.description === '자유 게시판' ||
//           channel.description === '인증 & 회고 게시판' ||
//           channel.description === '정보 공유 게시판',
//       ),
//   });

//   const channelListData = data;

//   return { channelListData, isError, isLoading };
// };

// export const channelListquery = queryOptions({
//   queryKey: [CHANNEL_LIST],
//   queryFn: getChannelList,
//   staleTime: 50000,
//   meta: {
//     errorMessage: '채널 목록을 가져올 때 에러가 발생했습니다.',
//   },
//   select: (data) =>
//     data.filter(
//       (channel) =>
//         channel.description === '자유 게시판' ||
//         channel.description === '인증 & 회고 게시판' ||
//         channel.description === '정보 공유 게시판',
//     ),
// });

// interface useChannelInfoProps {
//   channelInfo: string;
// }

// export const useChannelInfo = ({ channelInfo }: useChannelInfoProps) => {
//   const { data = [], isError } = useQuery<Channel[], AxiosError>({
//     queryKey: [CHANNEL_INFO],
//     queryFn: getChannelList,
//     select: (data) => data.filter((channel) => channel.name === channelInfo),
//   });

//   const channel = data[0];

//   return { channel, isError };
// };

// export const channelInfoQuery = (channelInfo: string) =>
//   queryOptions({
//     queryKey: [CHANNEL_INFO],
//     queryFn: getChannelList,
//     select: (data) => data.filter((channel) => channel.name === channelInfo)[0],
//     staleTime: 0,
//   });
