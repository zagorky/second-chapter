import { render, screen } from '@testing-library/react';
import ErrorPage from '~app/pages/error-page/errorPage';
import MainPage from '~app/pages/main-page/mainPage';
import { navigationRoutes } from '~config/navigation';
import { ErrorBoundary } from 'react-error-boundary';
import { createMemoryRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

describe('ErrorPage', () => {
  it('should render with a header', () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <ErrorPage />,
          errorElement: <ErrorPage />,
        },
      ],
      {
        initialEntries: ['/'],
        initialIndex: 0,
      }
    );

    render(
      <ErrorBoundary fallback={<ErrorPage />}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('not-found-page-header')).toBeInTheDocument();
  });

  it('should render for unknown routes', () => {
    const brokenLink = '/popique';

    const router = createMemoryRouter(
      [
        {
          path: navigationRoutes.main.path,
          element: <MainPage />,
        },
        {
          path: navigationRoutes.error.path,
          element: <ErrorPage />,
        },
      ],
      {
        initialEntries: [navigationRoutes.main.path, brokenLink],
        initialIndex: 1,
      }
    );

    render(
      <ErrorBoundary fallback={<ErrorPage />}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('not-found-page-header')).toBeInTheDocument();
  });
});
