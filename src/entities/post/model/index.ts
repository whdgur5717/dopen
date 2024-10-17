import type { SupabaseClientType } from 'shared/supabase';

export class Post {
  #client;
  #post;
  constructor(client: SupabaseClientType) {
    this.#client = client;
    this.#post = this.#client.from('posts');
  }
  temp() {
    return this.#post;
  }
}
