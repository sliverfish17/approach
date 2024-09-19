export interface RegistrationFormEntries {
  email: string;
  password: string;
  confirmPassword: string;
}

export type LoginFormEntries = Omit<RegistrationFormEntries, "confirmPassword">;
