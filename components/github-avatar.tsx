import Image from "next/image";

/**
 * Profile picture pulled straight from GitHub (server-side) so it never has to
 * be updated by hand and never costs an API request per visitor.
 */
const GithubAvatar = ({
  src,
  alt = "Profile picture",
}: {
  src: string;
  alt?: string;
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={64}
      height={64}
      priority
      className="h-16 w-16 shrink-0 rounded-full border border-neutral-200 object-cover dark:border-neutral-800"
    />
  );
};

export default GithubAvatar;
