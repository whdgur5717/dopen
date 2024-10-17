import { createClient } from '@supabase/supabase-js';
import { Channel } from 'entities/channel/model';
import { Post } from 'entities/post/model';

import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseClient = createClient<Database>(supabaseUrl, supabaseKey);
export type SupabaseClientType = typeof supabaseClient;

export class API {
  #client;
  channel;
  post;
  constructor(client: SupabaseClientType) {
    this.#client = client;
    this.channel = new Channel(this.#client);
    this.post = new Post(this.#client);
  }
}
export const client = new API(supabaseClient);
export default supabaseClient;
