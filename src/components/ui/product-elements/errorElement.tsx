import { Button } from '~components/ui/button/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~components/ui/card';

type ErrorProps = {
  error: Error;
  retryAction: () => void;
  title?: string;
  retryText?: string;
};

export const ErrorElement = ({
  error,
  retryAction,
  title = 'Something went wrong with fetching data',
  retryText = 'Try once more',
}: ErrorProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error.message}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={retryAction}>{retryText}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
