import { withDataTestId } from '~utils/helpers';

type AuthorElementProps = {
  author: string;
  id: string;
};

export const AuthorElement = ({ author, id }: AuthorElementProps) => {
  return (
    <div className="font-bold" {...withDataTestId(`${id}-author`)}>
      By {author}
    </div>
  );
};
