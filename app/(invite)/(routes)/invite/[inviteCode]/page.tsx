import {
  CreateMemberWithInviteCode,
  IsUserMemberWithInviteCode,
} from "@/data/server";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();
  if (!params.inviteCode) return redirect("/");

  const existingServer = await IsUserMemberWithInviteCode(
    params.inviteCode,
    profile.id
  );
  if (existingServer) return redirect(`/servers/${existingServer.id}`);

  const server = await CreateMemberWithInviteCode(
    params.inviteCode,
    profile.id
  );

  if (server) return redirect(`/servers/${server.id}`);

  return null;
};

export default InviteCodePage;
