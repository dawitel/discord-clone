import { CreateChannel } from "@/data/server";
import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

interface Params {
  req: Request;
}

export async function POST({ req }: Params) {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);
    
    const serverId = searchParams.get("serverId");
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!serverId) {
      return new NextResponse("Missing server ID", { status: 400 });
    }
    if (name === "general") {
      return new NextResponse("Name cannot be 'general'", { status: 400 });
    }
    const server = await CreateChannel(name, type, serverId, profile.id);
    return NextResponse.json(server);
  } catch (error) {
    console.log("[CHANNEL_CREATE] ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


