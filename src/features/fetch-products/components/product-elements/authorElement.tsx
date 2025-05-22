type AuthorElementProps = {
  author: string;
};

export const AuthorElement = ({ author }: AuthorElementProps) => {
  return (
    <div>
      <span className="font-bold">Author: </span>
      {author}
    </div>
  );
};
