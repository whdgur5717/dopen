import { createClient } from '@supabase/supabase-js';
import { Profile } from 'entities/auth/model';
import { Channel } from 'entities/channel/model';
import { Post } from 'entities/post/model';
import { TimerStamp } from 'entities/timer/model';

import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseClient = createClient<Database>(supabaseUrl, supabaseKey);
export type SupabaseClientType = typeof supabaseClient;

class ApiClient {
  #client;
  channel;
  post;
  timerStamp;
  profile;
  constructor(client: SupabaseClientType) {
    this.#client = client;
    this.channel = new Channel(this.#client);
    this.post = new Post(this.#client);
    this.timerStamp = new TimerStamp(this.#client);
    this.profile = new Profile(this.#client);
  }
}
export const client = new ApiClient(supabaseClient);
export default supabaseClient;
