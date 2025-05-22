import { render, screen } from '@testing-library/react';
import CatalogPage from '~app/pages/catalog-page/catalogPage';
import { MemoryRouter } from 'react-router';

describe('CatalogPage', () => {
  it('should render with a header and a list of products list with product item', () => {
    render(
      <MemoryRouter>
        <CatalogPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('catalog-page-header')).toBeInTheDocument();
  });
});
