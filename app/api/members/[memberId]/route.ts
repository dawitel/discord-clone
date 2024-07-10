import { KickMemberFromServer, UpdateMemberRole } from "@/data/server";
import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

interface MemberPATCHParams {
  req: Request;
  params: {
    memberId: string;
  };
}

export async function PATCH({ params, req }: MemberPATCHParams) {
  try {
    const profile = await currentProfile();
    const { role } = await req.json();

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!serverId)
      return new NextResponse("Server ID missing", { status: 400 });
    if (!params.memberId)
      return new NextResponse("Member ID missing", { status: 400 });

    const server = await UpdateMemberRole(
      serverId,
      profile.id,
      params.memberId,
      role
    );
    return NextResponse.json(server);
  } catch (error) {
    console.log("[MEMBER_ID_PATCH ]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function DELETE({ params, req }: MemberPATCHParams) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    
    const serverId = searchParams.get("serverId");

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!serverId)
      return new NextResponse("Server ID missing", { status: 400 });
    if (!params.memberId)
      return new NextResponse("Member ID missing", { status: 400 });

    const server = await KickMemberFromServer(
      serverId,
      params.memberId,
      profile.id
    );

    return NextResponse.json(server);
  } catch (error) {
    console.log("[DELETE_USER ]", error);
    return new NextResponse("Internal server error ", { status: 500 });
  }
}
