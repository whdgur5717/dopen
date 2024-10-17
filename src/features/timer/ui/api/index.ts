import type { SupabaseClientType } from 'shared/supabase';
import type { Database } from 'shared/supabase/database.types';

export type TimerStampType = Database['public']['Tables']['timerStamp']['Row'];
export class TimerStampClient {
  #client;
  #timerStamp;

  constructor(client: SupabaseClientType) {
    this.#client = client;
    this.#timerStamp = client.from('timerStamp');
  }

  async createTimerStamp({
    user_id,
    created_at,
    duration,
  }: Omit<TimerStampType, 'id'>) {
    return await this.#timerStamp.insert({ user_id, created_at, duration });
  }
}
