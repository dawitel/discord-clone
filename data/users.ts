import { db } from "@/lib/db";

export const getMembersById = async (serverId: string, profileId: string) => {
  const member = await db.member.findFirst({
    where: {
      serverId,
      profileId,
    },
  });
  return member
};
