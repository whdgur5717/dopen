import type { SupabaseClientType } from 'shared/supabase';

export class Channel {
  #client;
  #channel;

  constructor(client: SupabaseClientType) {
    this.#client = client;
    this.#channel = this.#client.from('channels');
  }

  async getChannelList() {
    const { data } = await this.#channel.select(
      `
        id,
        board_name,
        display,
        posts (
          id,
          title,
          content,
          created_at
        )
      `,
    );
    return data;
  }

  async getChannelId(boardName: string) {
    const { data } = await this.#channel
      .select('id')
      .eq('board_name', boardName);
    return data?.[0];
  }
  async getPostList(boardId: string) {
    const { data, error } = await this.#channel
      .select(
        `
      posts (
        id,
        title,
        content,
        created_at,
        profiles (
          id,
          user_name,
          avatar_url
        )
      )
    `,
      )
      .eq('id', boardId);

    if (error) throw new Error(error.message);
    if (data === null) throw new Error('post not found');

    return data[0].posts;
  }
}
