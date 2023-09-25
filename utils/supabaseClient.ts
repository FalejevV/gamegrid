import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SupabaseClientOptions } from '@supabase/supabase-js';

const supabaseOptions: SupabaseClientOptions<string> = {
  auth: {
    persistSession: false
  },
};
const supabaseClient = createClientComponentClient({
    options:supabaseOptions
});

export default supabaseClient
