import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SupabaseClient, SupabaseClientOptions } from '@supabase/supabase-js';

const supabaseOptions: SupabaseClientOptions<string> = {
  auth: {
    persistSession: false
  },
};
const supabaseClient = createClientComponentClient({
    options:supabaseOptions
}) as SupabaseClient

export default supabaseClient
