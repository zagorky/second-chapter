import { render, screen } from '@testing-library/react';
import SignInPage from '~app/pages/sign-in-page/signInPage';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';

vi.mock('~features/sign-in-form/signInForm', () => ({
  SignInForm: () => <div>SignInForm</div>,
}));

describe('SignInPage', () => {
  it('done', () => {
    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('signin-header')).toBeInTheDocument();
    expect(screen.getByTestId('signin-form')).toBeInTheDocument();
  });
});
