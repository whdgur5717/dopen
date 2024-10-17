import type { SupabaseClientType } from 'shared/supabase';

export class Profile {
  #client;
  #channel;

  constructor(client: SupabaseClientType) {
    this.#client = client;
    this.#channel = this.#client.from('profiles');
  }
}
