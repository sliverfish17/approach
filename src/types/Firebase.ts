export interface FirebaseAuthError {
  code: number;
  message: string;
  errors: Array<{
    message: string;
    domain: string;
    reason: string;
  }>;
}
