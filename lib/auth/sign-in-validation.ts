export type SignInFormValues = {
  email: string;
  password: string;
};

export type SignInFormErrors = Partial<Record<keyof SignInFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSignInField(name: keyof SignInFormValues, value: string): string {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return name === "email" ? "Email is required" : "Password is required";
  }

  if (name === "email" && !EMAIL_PATTERN.test(trimmedValue)) {
    return "Enter a valid email address";
  }

  return "";
}

export function validateSignInForm(values: SignInFormValues): SignInFormErrors {
  return {
    email: validateSignInField("email", values.email),
    password: validateSignInField("password", values.password),
  };
}
