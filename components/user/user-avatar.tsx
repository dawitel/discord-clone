import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  classame?: string;
  imageUrl?: string;
};

export const UserAvatar = ({ imageUrl, classame }: UserAvatarProps) => {
  return (
    <Avatar className={cn("h-7 w-7 md:w-10", classame)}>
      <AvatarImage src={imageUrl} />
    </Avatar>
  );
};
