import { fetchImageToBuffer } from "@/utils/imageFormat";
import supabaseRootClient from "@/utils/supabaseRootClient";
import supabaseServer from "@/utils/supabaseServer";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {

  return new NextResponse(JSON.stringify("Only post"), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}


export async function POST(request: NextRequest): Promise<NextResponse> {
  const userAuth = await supabaseServer().auth.getUser();
  let userUUID = userAuth.data.user?.id;
  if (!userUUID) {
    return new NextResponse(JSON.stringify({
      data: null,
      error: "Auth error"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }
  let publicIdRequest = await supabaseRootClient().from("profile").select("user_id").eq("id", userUUID).single();
  if (!publicIdRequest.data?.user_id) {
    return new NextResponse(JSON.stringify({
      data: null,
      error: "user_id not found"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }

  const data = await request.formData();
  const file: File | null = data.get('image') as unknown as File;
  if (!file) {
    return new NextResponse(JSON.stringify({
      data: null,
      error: "File not found"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }

  if (!file.type.includes("image")) {
    return new NextResponse(JSON.stringify({
      data: null,
      error: "Wrong file format"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }

  let { error } = await supabaseRootClient().storage.from("gamegrid").upload(`avatar/${publicIdRequest.data.user_id}.webp`, file, { upsert: true });
  let url = "https://kvwtrzxxikuvdjmcwofc.supabase.co/storage/v1/object/public/gamegrid/avatar/";
  if (!error) {
    let updatResponse = await supabaseRootClient().from("profile").update({
      avatar: url + publicIdRequest.data.user_id + ".webp?" +new Date().valueOf()
    }).eq("id", userUUID);
    if (updatResponse.error) {
      return new NextResponse(JSON.stringify({
        data: null,
        error: updatResponse.error.message
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }
  } else {
    return new NextResponse(JSON.stringify({
      data: null,
      error: error.message
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }

return new NextResponse(JSON.stringify({
  data: null,
  error: null
}), {
  status: 200,
  headers: { "Content-Type": "application/json" },
})
}