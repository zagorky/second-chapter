import { withDataTestId } from '~utils/helpers';

type AuthorElementProps = {
  author: string;
  id: string;
};

export const AuthorElement = ({ author, id }: AuthorElementProps) => {
  return (
    <div {...withDataTestId(`${id}-author`)}>
      <span className="font-bold">Author: </span>
      {author}
    </div>
  );
};
