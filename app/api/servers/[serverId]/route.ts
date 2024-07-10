import { UpdateServer } from "@/data/server";
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
