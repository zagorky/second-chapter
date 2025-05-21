import type { FallbackProps } from 'react-error-boundary';

import { Button } from '~/components/ui/button/button';
import { Card, CardFooter, CardHeader, CardTitle, CardContent } from '~/components/ui/card';

type ErrorFallbackProps = {
  title?: string;
  retryText?: string;
} & FallbackProps;

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
  title = 'Something went wrong',
  retryText = 'Try once more',
}: ErrorFallbackProps) => {
  const message = error instanceof Error ? error.message : 'Unknown error';

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{message}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={resetErrorBoundary}>{retryText}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
