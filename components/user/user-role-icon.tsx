import { MemberRole } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import React from "react";

type UserRoleIconProps = {
  role: MemberRole;
};

export const UserRoleIcon = ({ role }: UserRoleIconProps) => {
  return (
    <div>
      {role === "ADMIN" && <ShieldAlert className="h-4 w-4 text-rose-500" />}
      {role === "MODERATOR" && (
        <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />
      )}
      {role === "GUEST" && ""}
    </div>
  );
};
