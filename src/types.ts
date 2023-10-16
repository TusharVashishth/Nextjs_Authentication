type registerErrorType = {
  email?: string;
  name?: string;
  password?: string;
};

type LoginPayloadType = {
  email: string;
  password: string;
};

type LoginErrorType = {
  email?: string;
  password?: string;
};

// * Auth INput type
type AuthInputType = {
  label: string;
  type: string;
  name: string;
  errors: registerErrorType;
  callback: (name: string, value: string) => void;
};

// * Forgot password payload type
type ForgotPasswordPayload = {
  email: string;
};

// reset password type
type ResetPasswordPayload = {
  email: string;
  signature: string;
  password: string;
  password_confirmation: string;
};

// * Magic link payload type
type MagicLinkPayload = {
  email: string;
};

type MagicLinkPayloadVerify = {
  email: string;
  token: string;
};
