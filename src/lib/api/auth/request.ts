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
  confirmPassword?: string;
}
export interface SignUpPhoneNumberRequest {
  phoneNumber: number;
  password: string;
  confirmPassword?: string;
}

// Activate
export interface ActivateRequest {
  code: number;
  token?: string;
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
  token?: string;
}
export interface ForgotNewPasswordRequest {
  password: string;
  confirmPassword?: string;
  token?: string;
}

// Logout
export interface LogoutRequest {
  message?: string | null;
}
