import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import SignInPage from '~app/pages/sign-in-page/signInPage';
import SignUpPage from '~app/pages/sign-up-page/signUpPage';
import { navigationRoutes } from '~config/navigation';
import { SignInForm } from '~features/sign-in/components/signInForm';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH, SPEC_CHARACTERS } from '~features/sign-in/types/schemas';
import { MemoryRouter, Route, Routes } from 'react-router';

class SignInFormTestModel {
  public get emailInput() {
    return screen.getByTestId('email-input');
  }

  public get passwordInput() {
    return screen.getByTestId('password-input');
  }

  public get submitButton() {
    return screen.getByRole('button', { name: /submit/i });
  }

  public get redirectionLink() {
    return screen.getByTestId('redirection-link');
  }

  public static render() {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );

    return new SignInFormTestModel();
  }

  public static renderWithRouter() {
    render(
      <MemoryRouter initialEntries={[navigationRoutes.login.path]}>
        <Routes>
          <Route path={navigationRoutes.login.path} element={<SignInPage />} />
          <Route path={navigationRoutes.signup.path} element={<SignUpPage />} />
        </Routes>
      </MemoryRouter>
    );

    return new SignInFormTestModel();
  }

  public clickSubmit = () => {
    fireEvent.click(this.submitButton);
  };

  public clickRedirectionLink = async () => {
    await userEvent.click(this.redirectionLink);
  };

  public fillEmailAndSubmit = (value: string) => {
    fireEvent.change(this.emailInput, { target: { value: value } });
    this.clickSubmit();
  };

  public fillPasswordAndSubmit = (value: string) => {
    fireEvent.change(this.passwordInput, { target: { value: value } });
    this.clickSubmit();
  };
}

describe('SignInForm', () => {
  it('should render form with all fields', () => {
    const { emailInput, passwordInput, submitButton, redirectionLink } = SignInFormTestModel.render();

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(redirectionLink).toBeInTheDocument();
  });

  it('link should navigate to sing up page', async () => {
    const { redirectionLink, clickRedirectionLink } = SignInFormTestModel.renderWithRouter();

    expect(redirectionLink).toBeInTheDocument();
    expect(redirectionLink).toHaveAttribute('href', navigationRoutes.signup.path);
    await clickRedirectionLink();
    expect(screen.getByTestId('signup-header')).toBeInTheDocument();
  });

  it('should show validation errors for empty fields', async () => {
    const { clickSubmit } = SignInFormTestModel.render();

    clickSubmit();
    expect(await screen.findByText('Email cannot be empty')).toBeInTheDocument();
    expect(
      await screen.findByText(`Password must be at least ${MIN_PASSWORD_LENGTH.toString()} characters long`)
    ).toBeInTheDocument();
  });

  it('email should not contain any whitespace', async () => {
    const { fillEmailAndSubmit } = SignInFormTestModel.render();

    fillEmailAndSubmit('popique the cat');
    expect(await screen.findByText('Email must not contain any whitespace')).toBeInTheDocument();
  });

  it("email should contain an '@' symbol separating local part and domain name", async () => {
    const { fillEmailAndSubmit } = SignInFormTestModel.render();

    fillEmailAndSubmit('popiqueTheCat');
    expect(
      await screen.findByText("Email must contain an '@' symbol separating local part and domain name")
    ).toBeInTheDocument();
  });

  it('email should contain a domain name', async () => {
    const { fillEmailAndSubmit } = SignInFormTestModel.render();

    fillEmailAndSubmit('popiqueTheCat@');

    expect(await screen.findByText('Email must contain a domain name (e.g., example.com)')).toBeInTheDocument();
  });

  it('email should be properly formatted (e.g., user@example.com)', async () => {
    const { fillEmailAndSubmit } = SignInFormTestModel.render();

    fillEmailAndSubmit('popiqueTheCat@q.1');

    expect(await screen.findByText('Email must be properly formatted (e.g., user@example.com)')).toBeInTheDocument();
  });

  it('password should contain at least one uppercase letter (A-Z)', async () => {
    const { fillPasswordAndSubmit } = SignInFormTestModel.render();

    fillPasswordAndSubmit('popique the cat');

    expect(await screen.findByText('Password must contain at least one uppercase letter (A-Z)')).toBeInTheDocument();
  });

  it('password should contain at least one lowercase letter (a-z)', async () => {
    const { fillPasswordAndSubmit } = SignInFormTestModel.render();

    fillPasswordAndSubmit('POPIQUE THE CAT');
    expect(await screen.findByText('Password must contain at least one lowercase letter (a-z)')).toBeInTheDocument();
  });

  it('password should contain at least one digit (0-9)', async () => {
    const { fillPasswordAndSubmit } = SignInFormTestModel.render();

    fillPasswordAndSubmit('Popique the cat');

    expect(await screen.findByText('Password must contain at least one digit (0-9)')).toBeInTheDocument();
  });

  it(`password should contain no more than ${MAX_PASSWORD_LENGTH.toString()} characters`, async () => {
    const { fillPasswordAndSubmit } = SignInFormTestModel.render();

    fillPasswordAndSubmit('Popique the cat0000000');

    expect(
      await screen.findByText(`Password must be no more than ${MAX_PASSWORD_LENGTH.toString()} characters`)
    ).toBeInTheDocument();
  });

  it(`password should contain at least one special character (e.g., ${SPEC_CHARACTERS.toString()})`, async () => {
    const { fillPasswordAndSubmit } = SignInFormTestModel.render();

    fillPasswordAndSubmit('PopiqueTheCat0');

    expect(
      await screen.findByText(
        `Password must contain at least one special character (e.g., ${SPEC_CHARACTERS.toString()})`
      )
    ).toBeInTheDocument();
  });

  it('password should not contain any whitespace characters', async () => {
    const { fillPasswordAndSubmit } = SignInFormTestModel.render();

    fillPasswordAndSubmit('Popik the!cat1');

    expect(await screen.findByText('Password must not contain any whitespace characters')).toBeInTheDocument();
  });
});
