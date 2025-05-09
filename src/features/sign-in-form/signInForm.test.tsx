import { render, screen } from '@testing-library/react';
import { SignInForm } from '~features/sign-in-form/signInForm';
import { MemoryRouter } from 'react-router';

describe('SignInForm', () => {
  it('should render form with all fields', () => {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/user@example.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
  });
});
