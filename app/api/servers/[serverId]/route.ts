import { DeleteServer, UpdateServer } from "@/data/server";
import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";

interface props {
  req: Request;
  params: {
    serverId: string;
  };
}
export async function PATCH({ params, req }: props) {
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse("Server ID missing", { status: 403 });
    }

    // update the server req data
    const server = await UpdateServer(
      params.serverId,
      name,
      imageUrl,
      profile.id
    );

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_UPDATE ]", error);
    return new NextResponse("Internal Error: ", { status: 500 });
  }
}

export async function DELETE({ params }: { params: { serverId: string } }) {
  try {
    if (!params.serverId) {
      return new NextResponse("MISSING server ID", { status: 400 });
    }

    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const server = await DeleteServer(params.serverId, profile.id);

    return NextResponse.json(server);
  } catch (error) {
    console.log("[DELETE_SERVER_PATCH] ", error);
    return new NextResponse("Internal Server Error ", { status: 500 });
  }
}
