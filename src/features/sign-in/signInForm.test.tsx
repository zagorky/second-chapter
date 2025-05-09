import { fireEvent, render, screen } from '@testing-library/react';
import { SignInForm } from '~features/sign-in/signInForm';
import { MemoryRouter } from 'react-router';

describe('SignInForm', () => {
  it('should render form with all fields', () => {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByTestId('redirection-link')).toBeInTheDocument();
  });

  it('link should navigate to sing up page', () => {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );

    const link = screen.getByTestId('redirection-link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/signup');
  });

  it('should show validation errors for empty fields', async () => {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText('Email cannot be empty')).toBeInTheDocument();
    expect(await screen.findByText('Password must be at least 8 characters long')).toBeInTheDocument();
  });

  it('should show validation error for invalid email', async () => {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'popique the cat' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText('Invalid email format')).toBeInTheDocument();
  });

  it('should show contain at least one uppercase letter (A-Z)', async () => {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'popique the cat' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText('Password must contain at least one uppercase letter (A-Z)')).toBeInTheDocument();
  });

  it('should contain at least one lowercase letter (a-z)', async () => {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'POPIQUE THE CAT' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText('Password must contain at least one lowercase letter (a-z)')).toBeInTheDocument();
  });

  it('should contain at least one digit (0-9)', async () => {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Popique the cat' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText('Password must contain at least one digit (0-9)')).toBeInTheDocument();
  });

  it('should contain no more than 15 characters', async () => {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Popique the cat0' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText('Password must be no more than 15 characters')).toBeInTheDocument();
  });

  it('should contain at least one special character (e.g., !@#$%^&*)', async () => {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'PopiqueTheCat0' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(
      await screen.findByText('Password must contain at least one special character (e.g., !@#$%^&*)')
    ).toBeInTheDocument();
  });

  it('should not contain any whitespace characters', async () => {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Popik the!cat1' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText('Password must not contain any whitespace characters')).toBeInTheDocument();
  });
});
