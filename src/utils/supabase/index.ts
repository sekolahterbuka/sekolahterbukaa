import { createClient } from '@supabase/supabase-js';
import { supabaseKey } from './key';

const supabase = createClient(
  supabaseKey.url,
  supabaseKey.anonKey

  //   process.env.SUPABASE_URL,
  //   process.env.SUPABASE_ANON_KEY
);

export default supabase;
