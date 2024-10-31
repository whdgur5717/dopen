import type { SupabaseClientType } from 'shared/supabase';

export class Post {
  #client;
  #post;
  constructor(client: SupabaseClientType) {
    this.#client = client;
    this.#post = this.#client.from('posts');
  }
  async getPost(postId: string) {
    const { data } = await this.#post.select('*').eq('id', postId);
    if (!data) {
      throw new Error('포스트가 없습니다');
    }

    return data;
  }
}
