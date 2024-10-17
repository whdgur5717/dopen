import type { SupabaseClientType } from 'shared/supabase';

export class Channel {
  #client;
  #channel;

  constructor(client: SupabaseClientType) {
    this.#client = client;
    this.#channel = client.from('channels');
  }

  async getChannelList() {
    return await this.#channel.select(
      `
        id,
        name,
        posts (
          id,
          title,
          content,
          created_at
        )
      `,
    );
  }
}