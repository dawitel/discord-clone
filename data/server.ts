import { ProfileType } from "@/constants/types";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

/**
 * @description Gets server for a user with a given profile
 * @param profileId string
 * @returns a server object for the specified profile
 */
export const getServerByProfile = async (profile: ProfileType) => {
  const server = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return server;
};

/**
 * @description Get a server with a given id
 * @param id string
 * @returns server object with the given id
 */
export const getServerById = async (serverId: string, profileId: string) => {
  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId,
        },
      },
    },
  });
  return server;
};

/**
 * @description Get server channels, members with a given serverId
 * @param serverId string
 * @returns server object with the given id
 */
export const getServerDetailsById = async (serverId: string) => {
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
  return server;
};
/**
 * @description update a server with an invite code
 * @param serverId string
 * @param profileId string
 * @returns server object
 */
export const UpdateServerInviteCode = async (
  serverId: string,
  profileId: string
) => {
  const server = await db.server.update({
    where: {
      id: serverId,
      profileId,
    },
    data: {
      inviteCode: uuidv4(),
    },
  });

  return server;
};

/**
 * @description Check if a user is member of the server with the current invite code
 * @param inviteCode string
 * @param profileId string
 * @returns server object
 */
export const IsUserMemberWithInviteCode = async (
  inviteCode: string,
  profileId: string
) => {
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId,
        },
      },
    },
  });
  return existingServer;
};

export const CreateMemberWithInviteCode = async (
  inviteCode: string,
  profileId: string
) => {
  const server = await db.server.update({
    where: {
      inviteCode,
    },
    data: {
      members: {
        create: {
          profileId,
        },
      },
    },
  });
  return server;
};
