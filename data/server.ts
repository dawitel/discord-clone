import { ProfileType } from "@/constants/types";
import { db } from "@/lib/db";


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
