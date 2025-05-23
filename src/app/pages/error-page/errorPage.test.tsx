import { render, screen } from '@testing-library/react';
import ErrorPage from '~app/pages/error-page/errorPage';
import MainPage from '~app/pages/main-page/mainPage';
import { navigationRoutes } from '~config/navigation';
import { createMemoryRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

describe('SignInPage', () => {
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

    render(<RouterProvider router={router} />);

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

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('not-found-page-header')).toBeInTheDocument();
  });
});
