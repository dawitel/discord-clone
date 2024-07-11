import { DeleteChannel, UpdateChannel } from "@/data/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

interface Params {
  req: Request;
  params: {
    channelId: string;
  };
}

export async function DELETE({ req, params }: Params) {
  try {
    if (!params.channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Missing server ID", { status: 400 });
    }

    const server = await DeleteChannel(serverId, params.channelId, profile.id);
    return NextResponse.json(server);
  } catch (error) {
    console.log("[CHANNEL_ID_DELETE] ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH({ params, req }: Params) {
  try {
    if (!params.channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const { name, type } = await req.json();

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Missing server ID", { status: 400 });
    }
    if (name === "general") {
      return new NextResponse("Name cannot be 'general'", { status: 400 });
    }

    //  const server = await UpdateChannel(name, type, serverId, params.channelId, profile.id);
    // TODO: update to the UpdateChannel Usecase
    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: params.channelId,
              NOT: {
                name: "general",
              },
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[EDIT_CHANNEL] ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
