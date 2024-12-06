// Sign in
export interface SignInEmailRequest {
  email: string;
  password: string;
  stayConnected?: boolean;
}
export interface SignInPhoneNumberRequest {
  phoneNumber: number;
  password: string;
  stayConnected: boolean;
}
export interface SignInProviderRequest {
  provider: string;
  token: string;
}

// Sign up
export interface SignUpEmailRequest {
  email: string;
  password: string;
}
export interface SignUpPhoneNumberRequest {
  phoneNumber: number;
  password: string;
}

// Activate
export interface ActivateRequest {
  code: number;
  token: string;
}

// Forgot
export interface ForgotInitEmailRequest {
  email: string;
}
export interface ForgotInitPhoneNumberRequest {
  phoneNumber: number;
}
export interface ForgotCodeRequest {
  code: number;
}
export interface ForgotNewPasswordRequest {
  password: string;
  confirmPassword: string;
}

// Logout
export interface LogoutRequest {
  message?: string | null;
}
