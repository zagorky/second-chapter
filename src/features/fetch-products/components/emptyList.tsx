import { withDataTestId } from '~utils/helpers';

export const EmptyList = () => {
  return (
    <div className="flex flex-col items-center justify-center" {...withDataTestId('empty-list')}>
      <div className="m-auto max-w-xl p-10">
        <h3>Fear not, intrepid reader!</h3>
        <p>
          No books match your search right now—but our shelves are ever-changing! We&#39;re working to restock our
          collection of pre-loved books. Try refreshing the page or visit us again soon!
        </p>
      </div>
    </div>
  );
};
