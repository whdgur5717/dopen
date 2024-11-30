import { createClient } from '@supabase/supabase-js';

import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseClient = createClient<Database>(supabaseUrl, supabaseKey);
export type SupabaseClientType = typeof supabaseClient;

export default supabaseClient;
