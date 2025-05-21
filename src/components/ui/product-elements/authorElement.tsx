import type { Attribute } from '@commercetools/platform-sdk';

type AuthorElementProps = {
  prop: Attribute | undefined;
};

export const AuthorElement = ({ prop }: AuthorElementProps) => {
  const author = prop && (typeof prop.value === 'string' ? prop.value : 'Unknown');

  return (
    <div>
      <span className="font-bold">Author: </span>
      {author}
    </div>
  );
};
