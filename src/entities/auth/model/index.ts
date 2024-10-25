import type { SupabaseClientType } from 'shared/supabase';

export class Profile {
  #client;
  #profile;

  constructor(client: SupabaseClientType) {
    this.#client = client;
    this.#profile = this.#client.from('profiles');
  }
  async getUserProfile(id: string) {
    const { data } = await this.#profile.select('*').eq('id', id);
    return data;
  }
}
