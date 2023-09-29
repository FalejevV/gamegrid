import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

interface StringData {
    data: string[] | null,
    error: PostgrestError | null,
}

type TableName = "Role" | "Tag" | "Player" | "Platform" | "Gender" | "Developer" | "Country" | "Aspect"
export async function getTableList(supabase: SupabaseClient, tableName: TableName): Promise<StringData> {
    return supabase.from(tableName).select(`
        ${tableName.toLowerCase()}
    `).then(data => {
        let objectArray = data.data;
        let error = data.error;
        if (objectArray && objectArray.length > 0) {
            return {
                data: Array.from(new Set(objectArray.map((item: any) => item[tableName.toLowerCase()]))),
                error: null,
            }
        } else {
            return {
                data: null,
                error: error,
            }
        }
    })
}
