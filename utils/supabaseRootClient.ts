import { SupabaseClientOptions, createClient } from "@supabase/supabase-js";

let url = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
let key = process.env.NEXT_SUPABASE_SERVICE_KEY || ""

const supabaseOptions: SupabaseClientOptions<string> = {
  auth: {
    persistSession: false
  },
};
export default () => createClient(url,key, {
    ...supabaseOptions
});