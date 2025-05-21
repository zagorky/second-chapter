export const ErrorElement = ({ error }: { error: Error }) => {
  return (
    <div>
      <h2>Something went wrong...</h2>
      <h3>{error.name}</h3>
      <p>{error.message}</p>
    </div>
  );
};
