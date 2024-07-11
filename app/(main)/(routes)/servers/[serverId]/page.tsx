import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { getGeneralChannel } from "@/data/server";

type ServerIdPageProps = {
  params: {
    serverId: string;
  };
};

const ServerIdPage = async ({ params }: ServerIdPageProps) => {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();

  const initialChannel = await getGeneralChannel(params.serverId, profile.id);

  if(initialChannel?.name !== "general") return null
  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`);
};

export default ServerIdPage;
