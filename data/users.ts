import { db } from "@/lib/db";

type profileType = {
  id: string;
  userId: string;
  name: string;
  imageUrl: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};
/**
 * @description Gets server for a user with a given profile 
 * @param profileId string
 * @returns a server object for the specified profile
 */
export const getServerByProfile = async (
  profile: profileType
) => {
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
