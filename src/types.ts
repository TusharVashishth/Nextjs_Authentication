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
