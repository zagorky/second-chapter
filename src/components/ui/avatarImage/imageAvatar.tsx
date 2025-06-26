import { cn } from '~/lib/utilities';

type ProfileAvatarProps = {
  imageUrl: string;
};

export const ProfileAvatar = ({ imageUrl }: ProfileAvatarProps) => {
  return (
    <figure
      className={cn(
        'bg-background aspect-square w-[150px] overflow-hidden rounded-full border-2 p-4 text-center shadow-[3px_4px_0_0_rgba(0,0,0,1)]'
      )}
    >
      <img className="h-full w-full object-contain" src={imageUrl} alt="description" />
    </figure>
  );
};

export const AvatarImage = ({ imageUrl }: ProfileAvatarProps) => {
  return (
    <figure className={`border-border aspect-square w-[80px] overflow-hidden rounded-full border-2 text-center`}>
      <img className="h-full w-full object-cover" src={imageUrl} alt="Avatar" />
    </figure>
  );
};
