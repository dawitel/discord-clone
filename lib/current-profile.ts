import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export const currentProfile = async () => {
    const { userId } = auth();
    if (!userId) {
        return null;
    }
    
    // fetch the current users profile
  const profile = await db.profile.findUnique({
    where: {
      userId: userId,
    },
  });

  return profile;
};
