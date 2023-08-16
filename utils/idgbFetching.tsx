import { StringDataError } from "@/interface";

export async function fetchIGDBGameByName(search: string): Promise<StringDataError> {
    const result = await fetch('/api/igdb-game-search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: search
        }),
    }).then(res => res.json()).then(data => {
        let result: StringDataError = {
            data: null,
            error: null
        }
        if (data.error) {
            result.error = data.error.error
            return result;
        } else {
            result.data = data.data;
            return result;
        }
    });

    return result;
}


