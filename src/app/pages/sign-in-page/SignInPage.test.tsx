import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { SignInPage } from './signInPage';

vi.mock('~/features/sign-in-form/signInForm', () => ({
  SignInForm: () => <div>SignInForm</div>,
}));

describe('SignInPage', () => {
  it('done', () => {
    render(<SignInPage />);

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();

    expect(screen.getByText(/SignInForm/i)).toBeInTheDocument();
  });
});
