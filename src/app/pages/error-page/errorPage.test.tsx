import { render, screen } from '@testing-library/react';
import ErrorPage from '~app/pages/error-page/errorPage';
import MainPage from '~app/pages/main-page/mainPage';
import { navigationRoutes } from '~config/navigation';
import { MemoryRouter, Route, Routes } from 'react-router';

describe('SignInPage', () => {
  it('should render with a header', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('not-found-page-header')).toBeInTheDocument();
  });

  it('should render for unknown routes', () => {
    const brokenLink = '/popique';

    render(
      <MemoryRouter initialEntries={[navigationRoutes.main.path, brokenLink]}>
        <Routes>
          <Route path={navigationRoutes.main.path} element={<MainPage />} />
          <Route path={navigationRoutes.error.path} element={<ErrorPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('not-found-page-header')).toBeInTheDocument();
  });
});
