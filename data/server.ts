import { ProfileType } from "@/constants/types";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
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

/**
 * @description Add a user with a profile id to a server with a server id
 * @param inviteCode string
 * @param profileId string
 * @returns updated server object
 */
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

/**
 * @description Update data of a server
 * @param serverId strind
 * @param name strind
 * @param imageUrl strind
 * @param profileId strind
 * @returns updated server object
 */
export const UpdateServer = async (
  serverId: string,
  name: string,
  imageUrl: string,
  profileId: string
) => {
  const server = await db.server.update({
    where: {
      id: serverId,
      profileId,
    },
    data: {
      name,
      imageUrl,
    },
  });
  return server;
};

/**
 * @description update the role of a member using the data
 * @param serverId string
 * @param profileId string
 * @param memberId string
 * @param role MemberRole "GUEST" | "ADMIN" | "MODERATOR"
 * @returns Updated server object
 */
export const UpdateMemberRole = async (
  serverId: string,
  profileId: string,
  memberId: string,
  role: MemberRole
) => {
  const server = await db.server.update({
    where: {
      id: serverId,
      profileId,
    },
    data: {
      members: {
        update: {
          where: {
            id: memberId,
            profileId: {
              not: profileId,
            },
          },
          data: {
            role,
          },
        },
      },
    },
    include: {
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
 * @description Remove a member from a server
 * @param serverId string
 * @param memberId string
 * @param profileId string
 * @returns updated server object
 */
export const KickMemberFromServer = async (
  serverId: string,
  memberId: string,
  profileId: string
) => {
  const server = await db.server.update({
    where: {
      id: serverId,
      profileId,
    },
    data: {
      members: {
        deleteMany: {
          id: memberId,
          profileId: {
            not: profileId,
          },
        },
      },
    },
    include: {
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
 * @description Create a channel in a server with a data
 * @param name string
 * @param type ChannelType - "TEXT" | "AUDIO" | "VIDEO"
 * @param serverId string
 * @param profileId string
 * @returns updated server object
 */
export const CreateChannel = async (
  name: string,
  type: ChannelType,
  serverId: string,
  profileId: string
) => {
  const server = await db.server.update({
    where: {
      id: serverId,
      members: {
        some: {
          profileId,
          role: {
            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
          },
        },
      },
    },
    data: {
      channels: {
        create: {
          profileId,
          name,
          type,
        },
      },
    },
  });
  return server;
};

/**
 * @description Let the user leave from a server
 * @param serverId string
 * @param profileId sting
 * @returns updated server object
 */
export const LeaveFromServer = async (serverId: string, profileId: string) => {
  const server = await db.server.update({
    where: {
      id: serverId,
      profileId: {
        not: profileId,
      },
      members: {
        some: {
          profileId,
        },
      },
    },
    data: {
      members: {
        deleteMany: {
          profileId,
        },
      },
    },
  });

  return server;
};

/**
 * @description Delet a server with a given serverId
 * @param serverId string
 * @param profileId string
 * @returns updated server object
 */
export const DeleteServer = async (serverId: string, profileId: string) => {
  const server = await db.server.delete({
    where: {
      id: serverId,
      profileId,
    },
  });
  return server;
};

/**
 * @description Delete a channel from a server
 * @param serverId string
 * @param channelId string
 * @param profileId string
 * @returns updated server object
 */
export const DeleteChannel = async (
  serverId: string,
  channelId: string,
  profileId: string
) => {
  const server = await db.server.update({
    where: {
      id: serverId,
      members: {
        some: {
          profileId,
          role: {
            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
          },
        },
      },
    },
    data: {
      channels: {
        delete: {
          id: channelId,
          name: {
            not: "general",
          },
        },
      },
    },
  });
  return server;
};

export const UpdateChannel = async (
  name: string,
  type: string,
  serverId: string,
  channelId: string,
  profileId: string
) => {
  // const server = await db.server.update({
  //   where: {
  //     id: serverId,
  //     members: {
  //       some: {
  //         profileId,
  //         role: {
  //           in: [MemberRole.ADMIN, MemberRole.MODERATOR],
  //         },
  //       },
  //     },
  //   },
  //   data: {
  //     channels: {
  //       update: {
  //         where: {
  //           id: channelId,
  //           NOT: {
  //             name: "general",
  //           },
  //         },
  //         data: {
  //           name,
  //           type
  //         }
  //       }
  //     },
  //   },
  // });
  // return server
};

export const getGeneralChannel = async (
  serverId: string,
  profileId: string,
  
) => {
  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general"
        },
      },
    },
  });

  const initialChannel = server?.channels[0]

  return initialChannel;
};
