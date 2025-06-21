import type { FallbackProps } from 'react-error-boundary';

import { Button } from '~/components/ui/button/button';
import { Card, CardFooter, CardHeader, CardTitle, CardContent } from '~/components/ui/card';

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const message = error instanceof Error ? error.message : 'Unknown error';

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="">
        <CardHeader>
          <CardTitle>Something went wrong</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{message}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={resetErrorBoundary}>Try once more</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
