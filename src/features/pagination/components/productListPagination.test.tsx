import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductListPagination } from '~features/pagination/components/productListPagination';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockSetSearchParameters = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');

  return {
    ...actual,
    useSearchParams: vi.fn(() => [new URLSearchParams('page=2'), vi.fn()]),
  };
});

vi.mock('~hooks/useSyncQueryParameters', () => ({
  useSyncQueryParameters: () => ({
    updateURLParameters: mockSetSearchParameters,
    removeURLParameters: vi.fn(),
  }),
}));

describe('ProductListPagination', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render pagination with correct props', () => {
    render(
      <MemoryRouter>
        <ProductListPagination total={10} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('should not render pagination with incorrect props', () => {
    render(
      <MemoryRouter>
        <ProductListPagination total={0} />
      </MemoryRouter>
    );
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });

  it('should call setSearchParams with new page when clicking page number', async () => {
    render(
      <MemoryRouter>
        <ProductListPagination total={30} />
      </MemoryRouter>
    );

    const page2Link = screen.getByTestId('page-3');

    await userEvent.click(page2Link);

    expect(mockSetSearchParameters).toHaveBeenCalledOnce();
    expect(mockSetSearchParameters).toHaveBeenCalledWith({ page: 3 });
  });

  it('should call setSearchParams with next page when clicking next button', async () => {
    render(
      <MemoryRouter>
        <ProductListPagination total={30} />
      </MemoryRouter>
    );

    const nextButton = screen.getByTestId('page-next');

    await userEvent.click(nextButton);

    expect(mockSetSearchParameters).toHaveBeenCalledOnce();
    expect(mockSetSearchParameters).toHaveBeenCalledWith({ page: 3 });
  });

  it('should call setSearchParams with prev page when clicking prev button', async () => {
    render(
      <MemoryRouter>
        <ProductListPagination total={30} />
      </MemoryRouter>
    );
    const previousButton = screen.getByTestId('page-prev');

    await userEvent.click(previousButton);

    expect(mockSetSearchParameters).toHaveBeenCalledOnce();
    expect(mockSetSearchParameters).toHaveBeenCalledWith({ page: 1 });
  });
});
