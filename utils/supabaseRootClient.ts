import { createClient } from "@supabase/supabase-js";

let url = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
let key = process.env.NEXT_SUPABASE_SERVICE_KEY || ""
export default () => createClient(url,key);