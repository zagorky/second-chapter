import { render, screen } from '@testing-library/react';
import ErrorPage from '~app/pages/error-page/errorPage';
import MainPage from '~app/pages/main-page/mainPage';
import { navigationRoutes } from '~config/navigation';
import { createMemoryRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

describe('ErrorPage', () => {
  it('should render with a header', () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <ErrorPage />,
        },
      ],
      {
        initialEntries: ['/'],
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
          errorElement: <ErrorPage />,
        },
      ],
      {
        initialEntries: [brokenLink],
      }
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('not-found-page-header')).toBeInTheDocument();
  });
});
