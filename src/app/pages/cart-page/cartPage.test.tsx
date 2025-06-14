import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import CartPage from './cartPage';

describe('CartPage', () => {
  it('should render the hidden heading with the provided title', () => {
    const TEST_TITLE = 'test title';

    render(<CartPage title={TEST_TITLE} />);
    const heading = screen.getByRole('heading', { level: 1, hidden: true });

    expect(heading).toHaveTextContent(TEST_TITLE);
  });
});
