import type { SupabaseClientType } from 'shared/supabase';
import type { Database } from 'shared/supabase/database.types';

export type TimerStampType = Database['public']['Tables']['timerStamp']['Row'];
export class TimerStamp {
  #client;
  #timerStamp;

  constructor(client: SupabaseClientType) {
    this.#client = client;
    this.#timerStamp = this.#client.from('timerStamp');
  }

  async createTimerStamp({
    user_id,
    created_at,
    duration,
  }: Omit<TimerStampType, 'id'>) {
    return await this.#timerStamp.insert({ user_id, created_at, duration });
  }
  async getTimerStamps(id: TimerStampType['user_id']) {
    const { data } = await this.#timerStamp.select('*').eq('user_id', id);
    return data;
  }
}
