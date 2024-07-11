import { LeaveFromServer } from "@/data/server";
import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

interface PATCHParams {
  params: {
    serverId: string;
  };
}

export async function PATCH({ params }: PATCHParams) {
  try {
    if (!params.serverId)
      return new NextResponse("MISSING server ID", { status: 400 });
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    const server = await LeaveFromServer(params.serverId, profile.id);
    return NextResponse.json(server);
  } catch (error) {
    console.log("[LEAVE_SERVER_PATCH] ", error);
    return new NextResponse("Internal Server Error ", { status: 500 });
  }
}
