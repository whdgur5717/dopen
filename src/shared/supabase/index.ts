import { createClient } from '@supabase/supabase-js';
import { Channel } from 'entities/channel/model';
import { Post } from 'entities/post/model';
import { TimerStampClient } from 'features/timer/ui/api';

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
  constructor(client: SupabaseClientType) {
    this.#client = client;
    this.channel = new Channel(this.#client);
    this.post = new Post(this.#client);
    this.timerStamp = new TimerStampClient(this.#client);
  }
}
export const client = new ApiClient(supabaseClient);
export default supabaseClient;
