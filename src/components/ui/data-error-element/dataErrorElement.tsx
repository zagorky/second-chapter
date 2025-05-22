import { Button } from '~components/ui/button/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~components/ui/card';
import { withDataTestId } from '~utils/helpers';

type DataErrorElementProps = {
  errorText: string;
  retryAction: () => unknown;
  title?: string;
  retryText?: string;
};

export const DataErrorElement = ({
  errorText,
  retryAction,
  title = 'Something went wrong with fetching data',
  retryText = 'Try once more',
}: DataErrorElementProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center" {...withDataTestId('data-error-element')}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{errorText}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={retryAction}>{retryText}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
